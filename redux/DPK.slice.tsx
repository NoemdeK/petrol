import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dataset, regionalOption } from '../types';
import { six_months_data } from '../data';
import { authAxiosInstance } from '../utils/axios';
import axios from 'axios';

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
  resData: any;
  six__months: any;
  loading: boolean;
  selectedRegions: regionalOption[];
  error: any;
}
export const chartAllRegionDPK = createAsyncThunk(
  'prices/chartAllRegionDPK',
  async () => {
    try {
      const response = await axios(
        'https://petrodata.zainnovations.com/api/v1/data/chartAllRegionDPK'
      );

      return response.data;
      //   }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response Error:', error.response.data);
        throw new Error('Failed to fetch engaged talents. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
        throw new Error(
          'No response received. Please check your network connection.'
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General Error:', error.message);
        throw new Error(
          'An unexpected error occurred. Please try again later.'
        );
      }
    }
  }
);

const initialState: InitialStateProps = {
  data: initialData,
  resData: [],
  loading: false,
  selectedState: '',
  six__months: six_months_data,
  selectedRegions: [
    { label: 'North East', value: 'North East' },
    { label: 'North West', value: 'North West' },
  ],
  error: null,
  period: 'Six months',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(chartAllRegionDPK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        chartAllRegionDPK.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resData = action.payload.chartData;
          // state.prev = action.payload.prev;
          // state.count = action.payload.count; // Store the count
          // state.next = action.payload.next;
        }
      )
      .addCase(
        chartAllRegionDPK.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setSelectedRegions, setSelectedState } = prices.actions;

export default prices.reducer;
