"use client";

import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const auth = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const title = useMemo(() => (mode === "login" ? "Login" : "Create account"), [mode]);

  if (!open) return null;

  const submit = async () => {
    setStatus(null);
    if (!email || !password) {
      setStatus("Please enter email and password.");
      return;
    }
    const res = mode === "login" ? await auth.signIn(email, password) : await auth.signUp(email, password);
    if (!res.ok) {
      setStatus(res.error ?? "Something went wrong.");
      return;
    }
    setStatus(mode === "login" ? "Logged in." : "Account created. You are now logged in.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 premium-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl">{title}</h3>
            <p className="text-sm opacity-70 mt-1">Email + password authentication</p>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <input
            className="w-full px-4 py-3 rounded-xl border border-gold bg-white/70 outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-xl border border-gold bg-white/70 outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {status && <div className="text-sm opacity-80">{status}</div>}

          <button className="btn-primary w-full" onClick={submit}>
            {mode === "login" ? "Login" : "Sign up"}
          </button>

          <button
            className="w-full text-sm underline opacity-80 hover:opacity-100"
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
          >
            {mode === "login" ? "New here? Create an account" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
