// openModal.ts
import { create } from "zustand";

export type ModalType = "feeModal" | "changePasswordModal" | "suspendModal";

export type OpenModalState = {
  feeModal: boolean;
  changePasswordModal: boolean;
  suspendModal: boolean;
  data?: string;
  // actions
  open: (modalType: ModalType, data?: string) => void;
  close: (modalType: ModalType) => void;
  closeAll: () => void;
  toggle: (modalType: ModalType) => void;
  setOpenModal: (modalType: ModalType, value: boolean) => void;
  setData: (data: string) => void;
  reset: () => void;
};

export const useOpenModal = create<OpenModalState>((set) => ({
  feeModal: false,
  changePasswordModal: false,
  suspendModal: false,
  data: undefined,

  open: (modalType: ModalType, data?: string) =>
    set((state) => ({ ...state, [modalType]: true, data })),

  close: (modalType: ModalType) =>
    set((state) => ({ ...state, [modalType]: false, data: undefined })),

  closeAll: () =>
    set({ feeModal: false, changePasswordModal: false, suspendModal: false, data: undefined }),

  toggle: (modalType: ModalType) =>
    set((state) => ({ ...state, [modalType]: !state[modalType] })),

  setOpenModal: (modalType: ModalType, value: boolean) =>
    set((state) => ({ ...state, [modalType]: value })),

  setData: (data) => set({ data }),

  reset: () =>
    set({ feeModal: false, changePasswordModal: false, suspendModal: false, data: undefined }),
}));
