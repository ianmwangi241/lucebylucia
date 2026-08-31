import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const Route = createFileRoute("/update-password")({
  head: () => ({
    meta: [
      { title: "Update Password — Luce by Lucia" },
      {
        name: "description",
        content:
          "Enter your new password to secure your Luce by Lucia account.",
      },
      { property: "og:title", content: "Update Password — Luce by Lucia" },
      {
        property: "og:description",
        content: "Enter your new password to secure your account.",
      },
    ],
  }),
  component: UpdatePassword,
});

function UpdatePassword() {
  const supabase = createClient();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setHasRecoverySession(!!session);
      setCheckingSession(false);

      if (!session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new password reset link."
        );
      }
    }

    checkRecoverySession();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  const handleUpdatePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    if (!hasRecoverySession) {
      setError(
        "Your password reset session is invalid or has expired. Please request a new reset link."
      );
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);

      setTimeout(async () => {
        await supabase.auth.signOut();

        await navigate({
          to: "/login",
        });
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
      {/* Update Password Form Section */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="eyebrow tracking-widest text-[#C5A059] uppercase">
            Secure Update
          </span>

          <h1 className="font-serif text-3xl font-medium tracking-tight mt-3 text-foreground sm:text-4xl">
            Set new password
          </h1>

          <div className="h-[1px] w-16 bg-[#C5A059] my-6" />

          {checkingSession ? (
            <div className="mt-8 bg-secondary/40 border border-border/40 p-6 text-sm text-muted-foreground">
              Verifying your password recovery link...
            </div>
          ) : success ? (
            <div className="mt-8 space-y-6">
              <div className="bg-secondary/40 border border-[#C5A059]/30 p-6 text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground mb-1">
                  Password updated successfully
                </p>

                Redirecting you to sign in...
              </div>
            </div>
          ) : (
            <form
              className="space-y-6 mt-8"
              onSubmit={handleUpdatePassword}
            >
              <p className="text-muted-foreground text-sm leading-relaxed">
                Please enter a secure new password for your Luce by Lucia
                account.
              </p>

              {error && (
                <div
                  role="alert"
                  className="text-destructive text-xs bg-destructive/10 p-3 border border-destructive/20"
                >
                  {error}
                </div>
              )}

              {hasRecoverySession && (
                <>
                  <label className="block">
                    <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                      New Password
                    </span>

                    <input
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                    />
                  </label>

                  <label className="block">
                    <span className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">
                      Confirm New Password
                    </span>

                    <input
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Re-enter new password"
                      className="focus:border-[#C5A059] mt-2 w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Updating Password..."
                      : "Update Password"}
                  </button>
                </>
              )}
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
            </Link>
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
            Account Protection
          </h2>

          <div className="h-[1px] w-12 bg-[#C5A059]/60 my-5" />

          <p className="text-muted-foreground text-sm leading-relaxed mt-4">
            Your new password protects your Luce by Lucia profile, order
            history, delivery details, and saved wishlist across your
            devices.
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