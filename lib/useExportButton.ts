import { create } from "zustand";

interface AddNewCategoryModalStore {
  isExportRawDataOpen: boolean;
  onExportRawDataOpen: () => void;
  onExportRawDataClose: () => void;
  exportRawData: any;
  setExportRawData(data: any): void;
  supportDocs: [];
  updateSupportDocs(data: any): void;
  userType: string;
  setUserType(data: string): void;
}

const useExportRawData = create<AddNewCategoryModalStore>((set) => ({
  isExportRawDataOpen: false,
  onExportRawDataOpen: () => set({ isExportRawDataOpen: true }),
  onExportRawDataClose: () => set({ isExportRawDataOpen: false }),
  exportRawData: {},
  supportDocs: [],
  userType: "",
  setUserType: (data) => set({ userType: data }),
  updateSupportDocs: (data) => set({ supportDocs: data }),
  setExportRawData: (data) => set({ exportRawData: { data } }),
}));

export default useExportRawData;
