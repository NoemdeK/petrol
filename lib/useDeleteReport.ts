import { create } from "zustand";

interface AddNewCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
}

const useDeleteReport = create<AddNewCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (id) => set({ id: id }),
}));

export default useDeleteReport;
