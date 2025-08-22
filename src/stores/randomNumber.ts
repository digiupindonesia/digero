import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type RandomNumberStore = {
  number: number;
  setNumber: (value: number) => void;
  clearNumber: () => void;
};

export const useRandomNumberStore = create<RandomNumberStore>()(
  persist(
    (set) => ({
      number: 0,
      setNumber: (value: number) => set({ number: value }),
      clearNumber: () => set({ number: 0 }),
    }),
    {
      name: "random-number",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export type { RandomNumberStore };
