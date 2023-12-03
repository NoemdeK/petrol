import { createSlice } from "@reduxjs/toolkit";

interface USERProps {
  firstName: string;
  role: string;
  accountId: string;
}

export interface userProps {
  loading: boolean;
  error: string;
  message: string;
  user: USERProps | null;
}
const initialState: userProps = {
  loading: false,
  error: "",
  message: "",
  user: { firstName: "", role: "", accountId: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
