import { create } from 'zustand';

interface AddNewCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  tab: string;
  setTab: (id: string) => void;
}

const useTab = create<AddNewCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  tab: "pending",
  setTab: (tab) => set({tab: tab}),
}));


export default useTab;
