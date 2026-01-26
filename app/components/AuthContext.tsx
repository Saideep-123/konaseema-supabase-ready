"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthResult = { ok: boolean; error?: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Always hydrate session/user on first load (important for Navbar UI)
  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setUser(null);
      setLoading(false);
      return;
    }
    setUser(data.user ?? null);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      await refresh();
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // session is the source of truth on auth changes
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional: store name in user_metadata so Navbar can show it
  const signUp: AuthCtx["signUp"] = async (email, password, name) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: name ? { data: { name } } : undefined,
    });

    if (error) return { ok: false, error: error.message };

    // Some projects require email confirmation; user might not be available immediately.
    await refresh();
    return { ok: true };
  };

  const signIn: AuthCtx["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };

    await refresh();
    return { ok: true };
  };

  const signOut: AuthCtx["signOut"] = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return { ok: false, error: error.message };

    // Ensure UI updates instantly even if onAuthStateChange is delayed
    setUser(null);
    setLoading(false);
    return { ok: true };
  };

  const value = useMemo<AuthCtx>(
    () => ({ user, loading, signUp, signIn, signOut, refresh }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
