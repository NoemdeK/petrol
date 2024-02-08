import { create } from "zustand";

interface AddNewCategoryModalStore {
  isEditFeieldDataOpen: boolean;
  onEditFieldDataOpen: () => void;
  onEditFieldDataClose: () => void;
  editFielddata: any;
  setEditFieldData(data: any): void;
  supportDocs: [];
  updateSupportDocs(data: any): void;
  userType: string;
  setUserType(data: string): void;
}

const useEditFieldData = create<AddNewCategoryModalStore>((set) => ({
  isEditFeieldDataOpen: false,
  onEditFieldDataOpen: () => set({ isEditFeieldDataOpen: true }),
  onEditFieldDataClose: () => set({ isEditFeieldDataOpen: false }),
  editFielddata: {},
  supportDocs: [],
  userType: "",
  setUserType: (data) => set({ userType: data }),
  updateSupportDocs: (data) => set({ supportDocs: data }),
  setEditFieldData: (data) => set({ editFielddata: { data } }),
}));

export default useEditFieldData;
