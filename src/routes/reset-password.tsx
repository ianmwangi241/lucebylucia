import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Luce by Lucia" },
      {
        name: "description",
        content:
          "Reset your Luce by Lucia account password to regain access to your orders and wishlist.",
      },
      { property: "og:title", content: "Reset Password — Luce by Lucia" },
      {
        property: "og:description",
        content: "Reset your Luce by Lucia account password.",
      },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: `${window.location.origin}/update-password`,
        });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
      {/* Password Reset Form Section */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Account Recovery
          </span>

          <h1 className="font-serif text-3xl font-medium tracking-tight mt-3 text-foreground sm:text-4xl">
            Reset your password
          </h1>

          <div className="h-[1px] w-16 bg-[#C5A059] my-6" />

          {submitted ? (
            <div className="mt-8 space-y-6">
              <div className="bg-secondary/40 border border-[#C5A059]/30 p-6 text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground mb-2">
                  Check your email
                </p>

                We have sent a password recovery link to{" "}
                <span className="text-foreground font-medium">
                  {email}
                </span>
                . Please click the link inside to set a new password.
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setError(null);
                }}
                className="w-full border border-foreground text-foreground py-4 text-xs uppercase tracking-widest font-medium transition-all hover:bg-foreground hover:text-background"
              >
                Try another email
              </button>
            </div>
          ) : (
            <form
              className="space-y-6 mt-8"
              onSubmit={handleSubmit}
              noValidate={false}
            >
              <p className="text-muted-foreground text-sm leading-relaxed">
                Enter the email address associated with your account, and we
                will send you a secure link to reset your password.
              </p>

              {error && (
                <div
                  role="alert"
                  className="text-destructive text-xs bg-destructive/10 p-3 border border-destructive/20"
                >
                  {error}
                </div>
              )}

              <label className="block">
                <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                  Email address
                </span>

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lucia@example.com"
                  className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending link..." : "Send Recovery Link"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-border/40">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-[#C5A059] underline underline-offset-4 font-medium hover:text-foreground transition-colors"
            >
              Sign in
            </Link>{" "}
            to return to your client portal.
          </p>
        </div>
      </div>

      {/* Brand Value Proposition Card */}
      <div className="bg-secondary/30 border border-border/40 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />

        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Client Security
          </span>

          <h2 className="font-serif text-2xl font-medium tracking-tight mt-3 text-foreground">
            Secure Account Protection
          </h2>

          <div className="h-[1px] w-12 bg-[#C5A059]/60 my-5" />

          <p className="text-muted-foreground text-sm leading-relaxed mt-4">
            At Luce by Lucia, your account safety is our priority. Password
            recovery links provide a secure way to regain access without
            exposing your password.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            Need immediate support?
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