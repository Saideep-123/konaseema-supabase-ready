"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  // Drag state (x,y in px)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  // Lock background scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset form + position on open/close
  useEffect(() => {
    if (!open) return;
    setMode("login");
    setEmail("");
    setPassword("");
    setName("");
    setBusy(false);
    setMsg(null);
    setPos({ x: 0, y: 0 }); // centered position
  }, [open]);

  // Close modal after successful login (auth.user becomes available)
  useEffect(() => {
    if (open && auth.user) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const title = useMemo(
    () => (mode === "login" ? "Login" : "Create account"),
    [mode]
  );

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
      // If email confirmation is ON, user may not be logged in immediately:
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

  // Drag handlers (mouse + touch via pointer events)
  const onDragStart = (e: React.PointerEvent) => {
    // only left click / primary touch
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.baseX = pos.x;
    dragRef.current.baseY = pos.y;
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    // simple clamp so it doesn’t disappear off-screen too easily
    const nextX = dragRef.current.baseX + dx;
    const nextY = dragRef.current.baseY + dy;

    setPos({
      x: Math.max(-320, Math.min(320, nextX)),
      y: Math.max(-420, Math.min(420, nextY)),
    });
  };

  const onDragEnd = () => {
    dragRef.current.dragging = false;
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* centered wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* draggable modal */}
        <div
          className="w-full max-w-md rounded-2xl bg-[#fffaf2] border border-gold shadow-2xl"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          {/* drag handle header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-gold cursor-move select-none"
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
          >
            <div className="text-lg font-semibold">{title}</div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer"
              type="button"
            >
              <X />
            </button>
          </div>

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
                    onClick={() => {
                      setMsg(null);
                      setMode("signup");
                    }}
                    type="button"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="underline"
                    onClick={() => {
                      setMsg(null);
                      setMode("login");
                    }}
                    type="button"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            <div className="text-xs opacity-60 text-center">
              Tip: drag the top bar to move this window.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
