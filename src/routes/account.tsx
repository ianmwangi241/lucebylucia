import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Orders & Wishlist | Luce by Lucia" },
      {
        name: "description",
        content:
          "Sign in to your Luce by Lucia account to track orders, view your wishlist and manage delivery details.",
      },
      { property: "og:title", content: "My Account — Luce by Lucia" },
      {
        property: "og:description",
        content: "Track orders, view your wishlist and manage delivery details.",
      },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-16 px-5 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
      <div>
        <p className="eyebrow text-muted-foreground">Account</p>
        <h1 className="display-lg mt-4">Welcome back</h1>
        <div className="hairline-gold mt-7" />
        <form
          className="mt-9 space-y-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="eyebrow text-muted-foreground">Email address</span>
            <input
              type="email"
              required
              className="focus:border-gold mt-2 w-full border-b bg-transparent py-3 text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="eyebrow text-muted-foreground">Password</span>
            <input
              type="password"
              required
              className="focus:border-gold mt-2 w-full border-b bg-transparent py-3 text-sm outline-none"
            />
          </label>
          <button className="btn-ink w-full">Sign In</button>
          <p className="text-muted-foreground text-xs">
            New here?{" "}
            <span className="link-gold">Create an account</span> to track orders
            and save your wishlist.
          </p>
        </form>
      </div>

      <div className="bg-secondary/40 p-8 lg:p-10">
        <h2 className="eyebrow">Track an order</h2>
        <p className="text-muted-foreground mt-4 text-sm leading-loose">
          Enter your order number and the phone number used at checkout and
          we&apos;ll show your delivery status.
        </p>
        <form
          className="mt-7 space-y-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            placeholder="Order number"
            className="focus:border-gold w-full border-b bg-transparent py-3 text-sm outline-none"
          />
          <input
            placeholder="07XX XXX XXX"
            className="focus:border-gold w-full border-b bg-transparent py-3 text-sm outline-none"
          />
          <button className="btn-ink w-full">Track Order</button>
        </form>
        <p className="text-muted-foreground mt-8 text-xs leading-relaxed">
          Prefer to talk? Message our team on WhatsApp — we answer between 9am
          and 7pm EAT.{" "}
          <Link to="/shop" className="link-gold">
            Keep shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
