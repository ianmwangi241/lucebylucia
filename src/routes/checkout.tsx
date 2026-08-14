import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatKsh } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pay with M-Pesa or Card | Luce by Lucia" },
      {
        name: "description",
        content:
          "Secure Luce by Lucia checkout. Pay with M-Pesa or card, choose Nairobi same-day or nationwide delivery, all prices in KSh.",
      },
      { property: "og:title", content: "Checkout — Luce by Lucia" },
      {
        property: "og:description",
        content: "Pay with M-Pesa or card. Nairobi same-day delivery available.",
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

function Checkout() {
  const { lines, subtotal } = useCart();
  const [county, setCounty] = useState("Nairobi");
  const [method, setMethod] = useState("mpesa");
  const [placed, setPlaced] = useState(false);

  const delivery = subtotal === 0 ? 0 : county === "Nairobi" ? 300 : 550;
  const total = subtotal + delivery;

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
          className="space-y-12"
          onSubmit={(event) => {
            event.preventDefault();
            setPlaced(true);
          }}
        >
          <Fieldset legend="Contact information">
            <Field label="Full name" name="name" />
            <Field label="Email address" name="email" type="email" />
            <Field
              label="Phone (M-Pesa)"
              name="phone"
              type="tel"
              placeholder="07XX XXX XXX"
              pattern="0[17][0-9]{8}"
            />
          </Fieldset>

          <Fieldset legend="Delivery address">
            <label className="block">
              <span className="eyebrow text-muted-foreground">County</span>
              <select
                value={county}
                onChange={(event) => setCounty(event.target.value)}
                className="focus:border-gold mt-2 w-full border-b bg-transparent py-3 text-sm outline-none"
              >
                {COUNTIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <Field label="Area / estate" name="area" />
            <Field
              label="Delivery notes (optional)"
              name="notes"
              required={false}
            />
          </Fieldset>

          <Fieldset legend="Delivery method">
            <p className="text-muted-foreground text-sm leading-loose">
              {county === "Nairobi"
                ? "Nairobi: same-day for orders before 11am, otherwise next day. KSh 300."
                : `${county}: courier to your nearest agent in 2–4 working days. KSh 550.`}
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
                  className={`border px-6 py-4 text-[11px] tracking-[0.22em] uppercase ${
                    method === option.id
                      ? "border-ink bg-ink text-ivory"
                      : "hover:border-gold"
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

          <button type="submit" className="btn-ink w-full">
            Pay {formatKsh(total)}
          </button>
        </form>

        <aside className="bg-secondary/40 h-fit p-7 lg:p-9">
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
              <div key={line.id} className="flex gap-4">
                <img
                  src={line.image}
                  alt={line.name}
                  loading="lazy"
                  className="h-24 w-18 object-cover"
                />
                <div className="flex-1 text-sm">
                  <p>{line.name}</p>
                  <p className="text-muted-foreground mt-1 text-xs tracking-[0.16em] uppercase">
                    {line.color} / {line.size} · {line.qty}
                  </p>
                </div>
                <p className="text-sm">{formatKsh(line.price * line.qty)}</p>
              </div>
            ))}
          </div>

          <dl className="mt-8 space-y-3 border-t pt-6 text-sm">
            <Row label="Products" value={formatKsh(subtotal)} />
            <Row label="Delivery" value={formatKsh(delivery)} />
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
      <dd className="text-foreground">{value}</dd>
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
      <legend className="eyebrow">{legend}</legend>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
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
        className="focus:border-gold mt-2 w-full border-b bg-transparent py-3 text-sm outline-none"
      />
    </label>
  );
}
