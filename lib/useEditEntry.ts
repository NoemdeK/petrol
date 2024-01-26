import { create } from 'zustand';

interface AddNewCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
  data: any;
  setData: (id: string) => void;
}

const useEditEntry = create<AddNewCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (id) => set({id: id}),
  data: {},
  setData: (data) => set({data: data}),
}));


export default useEditEntry;
