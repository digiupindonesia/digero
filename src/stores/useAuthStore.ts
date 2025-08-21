// stores/useAuthStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthResponse } from "@/types/type";

// --- Versi state saat ini ---
// Ubah angka ini saat Anda mengubah bentuk state dan definisikan migrasinya.
const AUTH_STORE_VERSION = 1;

type AuthState = {
  auth: AuthResponse | null;
  isHydrated: boolean;

  // actions
  setAuth: (payload: AuthResponse) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<AuthResponse["user"]>) => void;
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
    }),
    {
      name: "auth-store",                  // kunci di sessionStorage
      version: AUTH_STORE_VERSION,
      storage: createJSONStorage(() => sessionStorage),
      // Simpan hanya bagian yang perlu (hindari simpan flag runtime)
      partialize: (state) => ({ auth: state.auth }),
      onRehydrateStorage: () => (state, error) => {
        // Dipanggil setelah rehidrasi
        if (error) {
          // opsional: kirim ke logger
          console.error("rehydration error", error);
        }
        // tandai sudah rehydrate agar UI bisa menghindari flicker
        // gunakan setTimeout microtask agar tidak bentrok lifecycle
        queueMicrotask(() => {
          state?.setAuth && state?.clearAuth; // keep type narrowing happy
        });
      },
      // Migrate state lama -> baru saat version naik
      migrate: (persistedState: any, version) => {
        // Template migrasi (isi sesuai kebutuhan saat bump version)
        switch (version) {
          case 0: {
            // Contoh: versi awal tidak punya field isVerified, atau nama key berbeda.
            // Lakukan transformasi agar cocok dengan versi 1.
            // (di contoh ini diasumsikan struktur sudah sesuai -> langsung return)
            return persistedState;
          }
          // Tambahkan case lain ketika Anda menaikkan AUTH_STORE_VERSION ke 2, 3, dst.
          default:
            return persistedState;
        }
      },
    }
  )
);
