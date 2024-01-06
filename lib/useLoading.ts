import { create } from 'zustand';

interface AddNewCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoading = create<AddNewCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useLoading;
