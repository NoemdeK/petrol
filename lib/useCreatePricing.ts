import { create } from "zustand";

type CreatePricingData = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: any;
  setError: (error: any) => void;
  success: any;
  setSuccess: (success: any) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
};

const useCreatePricing = create<CreatePricingData>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  error: null,
  setError: (error: any) => set({ error }),
  success: null,
  setSuccess: (success: any) => set({ success }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: null,
  setData: (data: any) => set({ data }),
}));

export default useCreatePricing;
