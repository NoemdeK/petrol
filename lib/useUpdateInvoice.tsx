import { create } from "zustand";

interface UpdateInvoice {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
}

const useUpdateInvoice = create<UpdateInvoice>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {},
  setData: (data: any) => set({ data }),
}));

export default useUpdateInvoice;
