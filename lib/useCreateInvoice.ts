import { create } from "zustand";

interface CreateInvoiceData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setData: (data: any) => void;
}

const useCreateInvoice = create<CreateInvoiceData>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {},
  isEditing: false,
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  setData: (data: any) => set({ data }),
}));

export default useCreateInvoice;
