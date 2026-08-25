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
    <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
      {/* Sign In Section */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Client Portal
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-tight mt-3 text-foreground sm:text-4xl">
            Welcome back
          </h1>
          <div className="h-[1px] w-16 bg-[#C5A059] my-6" />
          
          <form
            className="space-y-6 mt-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                Email address
              </span>
              <input
                type="email"
                required
                placeholder="lucia@example.com"
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
              />
            </label>
            <button className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-90">
              Sign In
            </button>
          </form>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40">
          <p className="text-muted-foreground text-xs leading-relaxed">
            New to Luce by Lucia?{" "}
            <Link to="/register" className="text-[#C5A059] underline underline-offset-4 font-medium hover:text-foreground transition-colors">
              Create an account
            </Link>{" "}
            to seamlessly track your orders and manage your saved wishlist.
          </p>
        </div>
      </div>

      {/* Track Order / Account Requirement Card */}
      <div className="bg-secondary/30 border border-border/40 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative design accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />

        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Order Tracking
          </span>
          <h2 className="font-serif text-2xl font-medium tracking-tight mt-3 text-foreground">
            Track your bespoke orders
          </h2>
          <div className="h-[1px] w-12 bg-[#C5A059]/60 my-5" />
          
          <p className="text-muted-foreground text-sm leading-relaxed mt-4">
            To ensure the security and privacy of your purchases, order tracking is exclusively available to registered clients. Please create an account or sign in to monitor your delivery status in real time.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            to="/register"
            className="w-full inline-block text-center border border-foreground text-foreground py-4 text-xs uppercase tracking-widest font-medium transition-all hover:bg-foreground hover:text-background"
          >
            Create an Account
          </Link>
          
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <p className="text-muted-foreground text-xs">
              Need immediate assistance?
            </p>
            <Link to="/shop" className="text-[#C5A059] text-xs uppercase tracking-wider font-medium hover:underline">
              Keep shopping &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}