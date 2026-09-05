import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatKsh } from "@/lib/products";
import { placeOrder, recordPayment } from "@/lib/services/order-service";

declare global {
  interface Window {
    PayHero?: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pay with M-Pesa or Card | Luce by Lucia" },
      {
        name: "description",
        content:
          "Secure Luce by Lucia checkout. Pay with M-Pesa or card, choose standard or matatu delivery, all prices in KSh.",
      },
      { property: "og:title", content: "Checkout — Luce by Lucia" },
      {
        property: "og:description",
        content: "Pay with M-Pesa or card. Flexible delivery options available.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const COUNTIES = [
  "Nairobi",
  "Kiambu",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Uasin Gishu",
  "Machakos",
  "Other county",
];

const PAYHERO_SDK_SRC = "https://applet.payherokenya.com/cdn/button_sdk.js?v=3.1";

function Checkout() {
  const { lines, subtotal, clear } = useCart();

  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryCounty, setDeliveryCounty] = useState("Nairobi");
  const [deliveryTown, setDeliveryTown] = useState("");
  const [deliveryEstate, setDeliveryEstate] = useState("");
  const [deliveryAddressLine, setDeliveryAddressLine] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const [deliveryType, setDeliveryType] = useState("standard");
  const [method, setMethod] = useState("mpesa");
  const [placed, setPlaced] = useState(false);
  const [placedFailed, setPlacedFailed] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const [showPayment, setShowPayment] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const initedRef = useRef(false);

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderReference, setOrderReference] = useState<string | null>(null);

  const shippingFee = subtotal === 0 ? 0 : deliveryType === "standard" ? 500 : deliveryCounty === "Nairobi" ? 300 : 550;
  const total = subtotal + shippingFee;

  useEffect(() => {
    if (window.PayHero) {
      setSdkReady(true);
      return;
    }
    const existing = document.querySelector(`script[src="${PAYHERO_SDK_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => setSdkReady(true));
      return;
    }
    const script = document.createElement("script");
    script.src = PAYHERO_SDK_SRC;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.error("Failed to load PayHero SDK");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data || typeof event.data !== "object") return;
      if (!("paymentSuccess" in event.data)) return;

      if (event.data.paymentSuccess) {
        if (orderId && orderReference) {
          recordPayment({
            data: {
              orderId,
              amount: total,
              paymentMethod: method,
              providerReference: orderReference,
              status: "success",
            },
          }).catch((err) => console.error("Failed to record payment", err));
        }
        clear();
        setPlaced(true);
      } else {
        setPlacedFailed(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [orderId, orderReference, total, method, clear]);

  useEffect(() => {
    if (!showPayment || !sdkReady || initedRef.current || !window.PayHero || !orderReference) return;
    initedRef.current = true;

    window.PayHero.init({
      paymentUrl: "https://lipwa.link/11736",
      width: "100%",
      height: "100%",
      containerId: "payHero",
      channelID: 11736,
      amount: total,
      phone: deliveryPhone,
      name: deliveryName,
      reference: orderReference,
      buttonName: `Pay ${formatKsh(total)}`,
      buttonColor: "#1a1a1a",
      successUrl: null,
      failedUrl: null,
      callbackUrl: null,
    });
  }, [showPayment, sdkReady, total, deliveryPhone, deliveryName, orderReference]);

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <div className="hairline-gold mx-auto" />
        <h1 className="display-lg mt-8">Order received</h1>
        <p className="text-muted-foreground mt-5 text-sm leading-loose">
          Check your phone for the M-Pesa prompt. We will send a confirmation and
          tracking number by SMS and WhatsApp once your parcel is dispatched.
        </p>
        <Link to="/shop" className="btn-ink mt-10">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
      <h1 className="display-lg">Checkout</h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <form
          ref={formRef}
          className="space-y-12"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!formRef.current?.checkValidity()) {
              formRef.current?.reportValidity();
              return;
            }
            if (lines.length === 0) return;

            setOrderError(null);
            setCreatingOrder(true);
            try {
              const result = await placeOrder({
                data: {
                  customerEmail,
                  deliveryName,
                  deliveryPhone,
                  deliveryCounty,
                  deliveryTown,
                  deliveryEstate,
                  deliveryAddressLine,
                  deliveryInstructions,
                  shippingFee,
                  subtotal,
                  total,
                  lines: lines.map((l) => ({
                    variantId: l.variantId,
                    sku: l.sku,
                    variantName: `${l.name} — ${l.color} / ${l.size}`,
                    unitPrice: l.price,
                    quantity: l.qty,
                  })),
                },
              });
              setOrderId(result.orderId);
              setOrderReference(result.orderNumber);
              setShowPayment(true);
            } catch (err) {
              console.error("Failed to create order", err);
              setOrderError(
                "We couldn't place your order. Please check your details and try again."
              );
            } finally {
              setCreatingOrder(false);
            }
          }}
        >
          <Fieldset legend="Contact information">
            <Field
              label="Full name"
              name="delivery_name"
              value={deliveryName}
              onChange={(e) => setDeliveryName(e.target.value)}
              placeholder="e.g. Amina Mohamed"
            />
            <Field
              label="Email address"
              name="customer_email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="e.g. amina@example.com"
            />
            <Field
              label="Phone (M-Pesa)"
              name="delivery_phone"
              type="tel"
              value={deliveryPhone}
              onChange={(e) => setDeliveryPhone(e.target.value)}
              placeholder="07XX XXX XXX"
              pattern="0[17][0-9]{8}"
            />
          </Fieldset>

          <Fieldset legend="Delivery address">
            <label className="block">
              <span className="eyebrow text-muted-foreground">County</span>
              <select
                value={deliveryCounty}
                onChange={(event) => setDeliveryCounty(event.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
              >
                {COUNTIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Town / City"
              name="delivery_town"
              value={deliveryTown}
              onChange={(e) => setDeliveryTown(e.target.value)}
              placeholder="e.g. Nairobi"
            />
            <Field
              label="Estate / Area"
              name="delivery_estate"
              value={deliveryEstate}
              onChange={(e) => setDeliveryEstate(e.target.value)}
              placeholder="e.g. Kilimani, Argwings Kodhek Rd"
            />
            <Field
              label="Apartment / Building / House number"
              name="delivery_address_line"
              value={deliveryAddressLine}
              onChange={(e) => setDeliveryAddressLine(e.target.value)}
              placeholder="e.g. Sunrise Apartments, Door 4B"
            />
            <Field
              label="Delivery instructions (optional)"
              name="delivery_instructions"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              required={false}
              placeholder="e.g. Leave with reception / Gate color"
            />
          </Fieldset>

          <Fieldset legend="Delivery method">
            <label className="block">
              <span className="eyebrow text-muted-foreground">Choose delivery type</span>
              <select
                value={deliveryType}
                onChange={(event) => setDeliveryType(event.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
              >
                <option value="standard">Standard Delivery (Nairobi & environs only) — KSh 500</option>
                <option value="matatu">Matatu / Shuttle Delivery</option>
              </select>
            </label>

            <p className="text-muted-foreground text-sm leading-loose mt-3">
              {deliveryType === "standard"
                ? "Standard delivery is only available for Nairobi and its environs. Cost: KSh 500."
                : "Note: The product will be taken to the nearest shuttle offices for collection."}
            </p>
          </Fieldset>

          <Fieldset legend="Payment">
            <div className="flex flex-wrap gap-3">
              {[
                { id: "mpesa", label: "M-Pesa" },
                { id: "card", label: "Card" },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMethod(option.id)}
                  aria-pressed={method === option.id}
                  className={`rounded-md border px-6 py-4 text-[11px] tracking-[0.22em] uppercase transition-all ${
                    method === option.id
                      ? "border-ink bg-ink text-ivory shadow-sm"
                      : "border-input bg-background hover:border-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {method === "mpesa"
                ? "You will receive an STK push prompt on the number above."
                : "Card payments are processed securely. 3-D Secure applies."}
            </p>
          </Fieldset>

          {orderError && (
            <p className="text-destructive text-sm">{orderError}</p>
          )}

          {!showPayment ? (
            <button
              type="submit"
              disabled={lines.length === 0 || creatingOrder}
              className="btn-ink w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {creatingOrder ? "Placing order…" : "Continue to Payment"}
            </button>
          ) : (
            <div className="space-y-3">
              {placedFailed && (
                <p className="text-destructive text-sm">
                  Payment didn't go through. You can try again below.
                </p>
              )}
              <div id="payHero" />
              {!sdkReady && (
                <p className="text-muted-foreground text-xs">Loading payment options…</p>
              )}
              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="link-gold text-[11px] tracking-[0.2em] uppercase"
              >
                ← Edit details
              </button>
            </div>
          )}
        </form>

        <aside className="bg-secondary/40 h-fit rounded-lg p-7 lg:p-9 border border-border/60">
          <h2 className="eyebrow">Order Summary</h2>
          <div className="mt-7 space-y-5">
            {lines.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Your bag is empty.{" "}
                <Link to="/shop" className="link-gold">
                  Shop new in
                </Link>
                .
              </p>
            )}
            {lines.map((line) => (
              <div key={line.id} className="flex gap-4 items-center">
                <img
                  src={line.image}
                  alt={line.name}
                  loading="lazy"
                  className="h-24 w-18 object-cover rounded"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{line.name}</p>
                  <p className="text-muted-foreground mt-1 text-xs tracking-[0.16em] uppercase">
                    {line.color} / {line.size} · Qty {line.qty}
                  </p>
                </div>
                <p className="text-sm font-medium">{formatKsh(line.price * line.qty)}</p>
              </div>
            ))}
          </div>

          <dl className="mt-8 space-y-3 border-t pt-6 text-sm">
            <Row label="Products" value={formatKsh(subtotal)} />
            <Row label="Delivery" value={formatKsh(shippingFee)} />
          </dl>
          <div className="mt-5 flex items-center justify-between border-t pt-5">
            <span className="eyebrow">Total</span>
            <span className="font-display text-2xl">{formatKsh(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground flex justify-between">
      <dt>{label}</dt>
      <dd className="text-foreground font-medium">{value}</dd>
    </div>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5 border-t pt-7">
      <legend className="eyebrow font-semibold">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  pattern,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold"
      />
    </label>
  );
}