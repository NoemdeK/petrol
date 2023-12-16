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
      const product = 'DPK';
      const regions = [
        'NORTH EAST',
        'NORTH WEST',
        'SOUTH SOUTH',
        'SOUTH WEST',
        'SOUTH EAST',
        'NORTH CENTRAL',
      ];

      const url = 'https://petrodata.zainnovations.com/api/v1/petro-data/analysis';
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4N2QzMTI1NWIxYTA1ZGZhZDQ4MTIiLCJyb2xlIjoicnd4X3VzZXIiLCJpYXQiOjE3MDIzOTUyMDF9.iZXOHmjSEBIG-kBJscRKMCd9WpZZEdRXGzN7_yDxTIg');

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          product,
          regions,
        }),
      };

      const response = await fetch(`${url}?period=MAX`, requestOptions);
      // console.log(response.json()), "repso"
      const result = await response.json();

      return result.data;
      
      
    } catch (error: any) {
      console.error('Error:', error.message);
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
          state.resData = action.payload;
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
