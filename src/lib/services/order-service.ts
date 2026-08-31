// src/lib/services/order-service.ts
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";

export type OrderLineInput = {
  variantId: string;
  sku: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
};

export type PlaceOrderInput = {
  customerEmail: string;
  deliveryName: string;
  deliveryPhone: string;
  deliveryCounty: string;
  deliveryTown: string;
  deliveryEstate: string;
  deliveryAddressLine: string;
  deliveryInstructions?: string;
  shippingFee: number;
  subtotal: number;
  total: number;
  lines: OrderLineInput[];
};

export const placeOrder = createServerFn({ method: "POST" })
  .validator((input: PlaceOrderInput) => input)
  .handler(async ({ data: input }) => {
    const supabase = createClient();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        currency: "KES",
        customer_email: input.customerEmail,
        delivery_name: input.deliveryName,
        delivery_phone: input.deliveryPhone,
        delivery_county: input.deliveryCounty,
        delivery_town: input.deliveryTown,
        delivery_estate: input.deliveryEstate,
        delivery_address_line: input.deliveryAddressLine,
        delivery_instructions: input.deliveryInstructions ?? null,
        shipping_fee: input.shippingFee,
        subtotal: input.subtotal,
        total: input.total,
        status: "pending",
        updated_at: new Date().toISOString(),
      })
      .select("id, order_number")
      .single();

    if (orderError) throw orderError;

    const orderItemsPayload = input.lines.map((line) => ({
      order_id: order.id,
      product_variant_id: line.variantId,
      sku: line.sku,
      variant_name: line.variantName,
      unit_price: line.unitPrice,
      quantity: line.quantity,
      total: line.unitPrice * line.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) throw itemsError;

    // Best-effort stock decrement — fetch-then-update, not atomic. Two
    // simultaneous orders for the last unit could both succeed. Fine at
    // boutique scale; for real concurrency safety, replace this loop with
    // a single Postgres function (e.g. decrement_variant_stock(id, qty))
    // called via supabase.rpc(), so the check-and-decrement happens
    // atomically inside the database instead of as two separate round trips.
    for (const line of input.lines) {
      const { data: variant } = await supabase
        .from("product_variants")
        .select("stock_quantity")
        .eq("id", line.variantId)
        .single();

      if (variant) {
        await supabase
          .from("product_variants")
          .update({
            stock_quantity: Math.max(0, variant.stock_quantity - line.quantity),
            updated_at: new Date().toISOString(),
          })
          .eq("id", line.variantId);
      }
    }

    return {
      orderId: order.id as string,
      orderNumber: order.order_number as string,
    };
  });

export const recordPayment = createServerFn({ method: "POST" })
  .validator(
    (input: {
      orderId: string;
      amount: number;
      paymentMethod: string;
      providerReference: string;
      status: string;
    }) => input
  )
  .handler(async ({ data: input }) => {
    const supabase = createClient();

    const { error } = await supabase.from("payments").insert({
      order_id: input.orderId,
      amount: input.amount,
      currency: "KES",
      payment_method: input.paymentMethod,
      provider: "payhero",
      provider_reference: input.providerReference,
      status: input.status,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    if (input.status === "success" || input.status === "paid") {
      await supabase
        .from("orders")
        .update({ status: "paid", updated_at: new Date().toISOString() })
        .eq("id", input.orderId);
    }

    return { ok: true };
  });