import {create} from 'zustand';

type PaginationStore = {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  goToNextPage: () => set((state) => ({ currentPage: Math.min(state.currentPage + 1, 21) })),
  goToPreviousPage: () => set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })),
}));

export default usePaginationStore;
