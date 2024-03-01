import { create } from "zustand";

interface CreateInvoiceData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
}

const useCreateInvoice = create<CreateInvoiceData>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {},
  setData: (data: any) => set({ data }),
}));

export default useCreateInvoice;
