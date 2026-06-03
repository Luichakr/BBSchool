"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Client-side mock auth, persisted to localStorage. Shaped for a future real
// backend (Supabase on the main platform): replace register/verify/login bodies
// with API calls + server-issued tokens/sessions; everything else stays.
//
// SECURITY NOTE: passwords are stored in plaintext in localStorage here ONLY
// because this is a front-end demo with no backend. The real cabinet hashes
// passwords server-side and never persists them client-side.

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — see note above
  verified: boolean;
  verifyToken: string;
  createdAt: string;
};

export type RegisterResult =
  | { ok: true; token: string }
  | { ok: false; error: "emailTaken" };

export type LoginResult =
  | { ok: true }
  | { ok: false; error: "noUser" | "badPassword" | "notVerified" };

type AuthState = {
  users: AuthUser[];
  currentUserId: string | null;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => RegisterResult;
  verify: (token: string) => boolean;
  login: (data: { email: string; password: string }) => LoginResult;
  logout: () => void;
  resend: (email: string) => string | null;
  tokenForEmail: (email: string) => string | null;
};

const norm = (e: string) => e.trim().toLowerCase();
const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `u_${Math.abs(Math.floor(Math.random() * 1e9)).toString(36)}`;

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      register: ({ name, email, password }) => {
        const e = norm(email);
        if (get().users.some((u) => u.email === e)) {
          return { ok: false, error: "emailTaken" };
        }
        const token = uid().replace(/-/g, "").slice(0, 24);
        const user: AuthUser = {
          id: uid(),
          name: name.trim(),
          email: e,
          password,
          verified: false,
          verifyToken: token,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ users: [...s.users, user] }));
        // TODO(backend): send verification email with link /verify-email?token=...
        return { ok: true, token };
      },

      verify: (token) => {
        const user = get().users.find((u) => u.verifyToken === token);
        if (!user) return false;
        set((s) => ({
          users: s.users.map((u) =>
            u.id === user.id ? { ...u, verified: true } : u,
          ),
          currentUserId: user.id,
        }));
        return true;
      },

      login: ({ email, password }) => {
        const e = norm(email);
        const user = get().users.find((u) => u.email === e);
        if (!user) return { ok: false, error: "noUser" };
        if (user.password !== password) return { ok: false, error: "badPassword" };
        if (!user.verified) return { ok: false, error: "notVerified" };
        set({ currentUserId: user.id });
        return { ok: true };
      },

      logout: () => set({ currentUserId: null }),

      resend: (email) => {
        const user = get().users.find((u) => u.email === norm(email));
        // TODO(backend): re-send verification email
        return user ? user.verifyToken : null;
      },

      tokenForEmail: (email) => {
        const user = get().users.find((u) => u.email === norm(email));
        return user && !user.verified ? user.verifyToken : null;
      },
    }),
    {
      name: "bb-auth",
      partialize: (s) => ({ users: s.users, currentUserId: s.currentUserId }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function useCurrentUser(): AuthUser | null {
  const { users, currentUserId } = useAuth();
  return users.find((u) => u.id === currentUserId) ?? null;
}
