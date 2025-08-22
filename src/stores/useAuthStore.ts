// stores/useAuthStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthResponse } from "@/types/type";

const AUTH_STORE_VERSION = 2;

type AuthState = {
  auth: AuthResponse | null;
  isHydrated: boolean;

  // actions
  setAuth: (payload: AuthResponse) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<AuthResponse["user"]>) => void;
  setIsHydrated: (v: boolean) => void; // 👈 tambahkan setter untuk expose status hydrated
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      auth: null,
      isHydrated: false,

      setAuth: (payload) => set({ auth: payload }),
      clearAuth: () => set({ auth: null }),
      updateUser: (partial) => {
        const current = get().auth;
        if (!current) return;
        set({
          auth: {
            ...current,
            user: { ...current.user, ...partial },
          },
        });
      },
      setIsHydrated: (v) => set({ isHydrated: v }), // 👈 expose ke luar
    }),
    {
      name: "auth-store",
      version: AUTH_STORE_VERSION,
      storage: createJSONStorage(() => sessionStorage),

      // simpan hanya bagian penting (jangan simpan flag runtime)
      partialize: (state) => ({ auth: state.auth }),

      // dipanggil SBLM rehydrate dimulai -> return fn yang dipanggil SETELAH rehydrate selesai
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("rehydration error", error);
        }
        // setelah rehydrate sukses, tandai siap
        state?.setIsHydrated(true); // 👈 inilah kuncinya
      },

      migrate: (persistedState: any, version) => {
        switch (version) {
            case 0:
              return persistedState;
            case 1:
              return {
                ...persistedState,
                auth: {
                  ...persistedState.auth,
                  user: {
                    ...persistedState.auth.user,
                    feePercent: 0,
                  },
                },
              };
          default:
            return persistedState;
        }
      },
    }
  )
);
