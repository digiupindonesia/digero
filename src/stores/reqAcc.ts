import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ReqAccForm = {
  accountName: string;
  businessCenterId: string;
};

type ReqAccStore = {
  form: ReqAccForm;
  setForm: (form: ReqAccForm) => void;
  updateForm: (field: keyof ReqAccForm, value: string) => void;
  clearForm: () => void;
  isFormValid: () => boolean;
};

const initialForm: ReqAccForm = {
  accountName: "",
  businessCenterId: "",
};

export const useReqAccStore = create<ReqAccStore>()(
  persist(
    (set, get) => ({
      form: initialForm,

      setForm: (form: ReqAccForm) => set({ form }),

      updateForm: (field: keyof ReqAccForm, value: string) =>
        set((state) => ({
          form: {
            ...state.form,
            [field]: value,
          },
        })),

      clearForm: () => set({ form: initialForm }),

      isFormValid: () => {
        const { form } = get();
        return (
          form.accountName.trim() !== "" && form.businessCenterId.trim() !== ""
        );
      },
    }),
    {
      name: "req-acc",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
