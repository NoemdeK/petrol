import { create } from 'zustand';


interface AddNewVehicleModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
  data: any;
  setData(data: any): void;

  
  tab: string;
  setTab(tab: string): void;
}

const useEditUser = create<AddNewVehicleModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (id) => set({id: id}),
  data: {},
  setData: (data) => set({ data: {data}}),
  tab: "rwx_data_entry_analyst",
  setTab: (tab) => set({ tab: tab}),
  
}));


export default useEditUser;
