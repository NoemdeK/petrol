import { create } from "zustand";

interface AddNewCategoryModalStore {
  isEditFeieldDataOpen: boolean;
  onEditFieldDataOpen: () => void;
  onEditFieldDataClose: () => void;
  editFielddata: any;
  setEditFieldData(data: any): void;
}

const useEditFieldData = create<AddNewCategoryModalStore>((set) => ({
  isEditFeieldDataOpen: false,
  onEditFieldDataOpen: () => set({ isEditFeieldDataOpen: true }),
  onEditFieldDataClose: () => set({ isEditFeieldDataOpen: false }),
  editFielddata: {},
  setEditFieldData: (data) => set({ editFielddata: { data } }),
}));

export default useEditFieldData;
