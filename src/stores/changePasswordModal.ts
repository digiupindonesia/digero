// changePasswordModal.ts
import { create } from "zustand";

export type ChangePasswordModalState = {
  openModal: boolean;
  data?: string;
  // actions
  open: (data?: string) => void;
  close: () => void;
  toggle: () => void;
  setOpenModal: (value: boolean) => void;
  setData: (data: string) => void;
  reset: () => void;
};

export const useChangePasswordModal = create<ChangePasswordModalState>(
  (set) => ({
    openModal: false,
    data: undefined,

    open: (data?: string) => set({ openModal: true, data }),
    close: () => set({ openModal: false, data: undefined }),
    toggle: () => set((s) => ({ openModal: !s.openModal })),
    setOpenModal: (value) => set({ openModal: value }),
    setData: (data) => set({ data }),
    reset: () => set({ openModal: false, data: undefined }),
  })
);
