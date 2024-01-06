import { create } from 'zustand';

interface AddNewCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
  data: string;
  setData: (id: string) => void;
}

const useReject = create<AddNewCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (id) => set({id: id}),
  data: "",
  setData: (data) => set({data: data}),
}));


export default useReject;
