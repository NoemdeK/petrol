import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dataset, regionalOption } from '../types';
import { six_months_data } from '../data';

const labels: string[] = [
  'Jan 2023',
  'Feb 2023',
  'Mar 2023',
  'Apr 2023',
  'May 2023',
  'June 2023',
];

const initialData: { labels: string[]; datasets: Dataset[] } = {
  labels,
  datasets: [],
};
interface InitialStateProps {
  period: string;
  selectedState: string;
  data: { labels: string[]; datasets: Dataset[] };
  six__months: any;
  loading: boolean;
  selectedRegions: regionalOption[];
  error: any;
  product: string;
}
export const fetchPrice = createAsyncThunk(
  'articles/fetchArticle',
  async (id: number) => {}
);

const initialState: InitialStateProps = {
  data: initialData,
  loading: false,
  selectedState: '',
  six__months: six_months_data,
  selectedRegions: [
  ],
  error: null,
  period: 'Six months',
  product: 'Premium Motor Spirit (PMS)',
};

export const prices = createSlice({
  name: 'prices',
  initialState: initialState,
  reducers: {
    setSelectedRegions: (state, action) => {
      state.selectedRegions = action.payload;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrice.fulfilled, (state, action) => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      //   articlesAdapter.upsertMany(state, action.payload.articles);
    });
  },
});

export const { setSelectedRegions, setSelectedState, setSelectedProduct } =
  prices.actions;

export default prices.reducer;
