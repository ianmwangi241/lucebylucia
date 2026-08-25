import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — Luce by Lucia" },
      {
        name: "description",
        content:
          "Create a Luce by Lucia account to track orders, manage delivery details, and save your favorite pieces to your wishlist.",
      },
      { property: "og:title", content: "Create Account — Luce by Lucia" },
      {
        property: "og:description",
        content: "Create an account to track orders and save your wishlist.",
      },
    ],
  }),
  component: Register,
});

function Register() {
    const supabase = createClient();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
            data: {
                full_name: fullName,
                phone: phone.trim(),
                avatar_url: null,
            },
            },
        });

        if (error) {
            setError(error.message);
            return;
        }

        if (!data.user) {
            setError("Unable to create your account. Please try again.");
            return;
        }

        setSuccess(
            "Your account has been created. Please check your email to verify your account."
        );
        } catch {
        setError("Something went wrong. Please try again.");
        } finally {
        setLoading(false);
        }
    }
  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
      {/* Registration Form Section */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            New Client
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-tight mt-3 text-foreground sm:text-4xl">
            Create an account
          </h1>
          <div className="h-[1px] w-16 bg-[#C5A059] my-6" />
          {error && (
            <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
            </div>
            )}

            {success && (
            <div className="mt-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
            </div>
            )}

          <form
            className="space-y-6 mt-8"
            onSubmit={handleRegister}
            >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                  First name
                </span>
                <input
                type="text"
                required
                placeholder="Lucia"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                  Last name
                </span>
                <input
                type="text"
                required
                placeholder="Vance"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                />
              </label>
            </div>

            <label className="block">
              <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                Email address
              </span>
              <input
                type="email"
                required
                placeholder="lucia@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                />
            </label>

            <label className="block">
              <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                Phone number (for order updates)
              </span>
              <input
                type="tel"
                required
                placeholder="07XX XXX XXX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
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
                minLength={8}
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                />
            </label>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
            {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Already have an account?{" "}
            <Link
              to="/account"
              className="text-[#C5A059] underline underline-offset-4 font-medium hover:text-foreground transition-colors"
            >
              Sign in
            </Link>{" "}
            to access your profile and track active orders.
          </p>
        </div>
      </div>

      {/* Brand Value Proposition Card */}
      <div className="bg-secondary/30 border border-border/40 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative design accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />

        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Member Benefits
          </span>
          <h2 className="font-serif text-2xl font-medium tracking-tight mt-3 text-foreground">
            The Luce Experience
          </h2>
          <div className="h-[1px] w-12 bg-[#C5A059]/60 my-5" />

          <ul className="space-y-4 text-muted-foreground text-sm leading-relaxed mt-4">
            <li className="flex items-start gap-3">
              <span className="text-[#C5A059] font-serif">•</span>
              <span>
                <strong className="text-foreground font-medium">
                  Secure Order Tracking:
                </strong>{" "}
                Monitor your bespoke orders and deliveries in real time with complete privacy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C5A059] font-serif">•</span>
              <span>
                <strong className="text-foreground font-medium">
                  Curated Wishlist:
                </strong>{" "}
                Save your favorite pieces across devices and revisit them whenever you choose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C5A059] font-serif">•</span>
              <span>
                <strong className="text-foreground font-medium">
                  Faster Checkout:
                </strong>{" "}
                Save your delivery addresses and preferences for a seamless purchasing flow.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            Have questions about your order?
          </p>
          <Link
            to="/shop"
            className="text-[#C5A059] text-xs uppercase tracking-wider font-medium hover:underline"
          >
            Explore collections &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}