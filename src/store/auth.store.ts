import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dojo } from "../services/auth.service";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  dojo: Dojo | null;
  setDojo: (dojo: Dojo) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null, dojo: null }),
      dojo: null,
      setDojo: (dojo) => set({ dojo }),
    }),
    {
      name: "auth-storage",
    }
  )
);
