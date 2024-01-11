import {create} from 'zustand';

type BatchData = string[]; // Replace string with the type of your data

type BatchItem = {
    fillingStation: string;
    city: string;
    state: string;
    product: string;
    price: number;
    priceDate: string;
    supportingDocument: string;
    // ... other properties
  };

interface BatchStore {
batchData: BatchItem[];
  setBatchData: (prevBatchData: BatchItem[]) => void;
//   deleteFromBatch: (idToDelete: string) => void;
}

export const useBatchStore = create<BatchStore>((set) => ({
  batchData: [],
  setBatchData: (prevBatchData: BatchItem[]) => set({ batchData: prevBatchData }),
}));
