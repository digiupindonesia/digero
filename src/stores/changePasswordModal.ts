// changePasswordModal.ts
import { create } from "zustand"

export type ChangePasswordModalState = {
  openModal: boolean
  // actions
  open: () => void
  close: () => void
  toggle: () => void
  setOpenModal: (value: boolean) => void
  reset: () => void
}

export const useChangePasswordModal = create<ChangePasswordModalState>((set) => ({
  openModal: false,

  open: () => set({ openModal: true }),
  close: () => set({ openModal: false }),
  toggle: () => set((s) => ({ openModal: !s.openModal })),
  setOpenModal: (value) => set({ openModal: value }),
  reset: () => set({ openModal: false }),
}))