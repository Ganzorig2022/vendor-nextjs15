"use client";

import { create } from "zustand";

type AuthState = {
  token: string | null;
  user: any | null;
  setAuth: (data: { access_token: string; user: any }) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  setAuth: (data) => set({ token: data.access_token, user: data.user }),

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear client state
      set({ token: null, user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));
