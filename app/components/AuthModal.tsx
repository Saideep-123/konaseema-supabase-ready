"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const auth = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // lock scroll behind modal
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // reset when opened
  useEffect(() => {
    if (!open) return;
    setMode("login");
    setEmail("");
    setPassword("");
    setName("");
    setBusy(false);
    setMsg(null);
  }, [open]);

  // close on successful login (auth.user becomes non-null)
  useEffect(() => {
    if (open && auth.user) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  if (!open) return null;

  const submit = async () => {
    setMsg(null);
    setBusy(true);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setBusy(false);
      setMsg("Please enter email and password.");
      return;
    }

    if (mode === "signup") {
      const res = await auth.signUp(cleanEmail, password, name.trim() || undefined);
      setBusy(false);
      if (!res.ok) {
        setMsg(res.error || "Signup failed.");
        return;
      }
      if (!auth.user) {
        setMsg("Signup successful. Check your email to confirm, then login.");
        setMode("login");
      }
      return;
    }

    const res = await auth.signIn(cleanEmail, password);
    setBusy(false);
    if (!res.ok) setMsg(res.error || "Invalid credentials.");
  };

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* perfect center */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-[#fffaf2] border border-gold shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold">
            <div className="text-lg font-semibold">
              {mode === "login" ? "Login" : "Create account"}
            </div>
            <button onClick={onClose} aria-label="Close" type="button">
              <X />
            </button>
          </div>

          {/* body */}
          <div className="p-5 space-y-3">
            {mode === "signup" && (
              <input
                className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <input
              className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />

            {msg && <div className="text-sm opacity-80">{msg}</div>}

            <button className="btn-primary w-full" onClick={submit} disabled={busy}>
              {busy ? "Please wait…" : mode === "login" ? "Login" : "Sign up"}
            </button>

            <div className="text-sm opacity-80 text-center">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    className="underline"
                    type="button"
                    onClick={() => {
                      setMsg(null);
                      setMode("signup");
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="underline"
                    type="button"
                    onClick={() => {
                      setMsg(null);
                      setMode("login");
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
