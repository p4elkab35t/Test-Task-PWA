import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  jwt: string | null;
  user: object | null; // Replace with a user type if available
}

const initialState: AuthState = {
  jwt: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ jwt: string; user: object }>) => {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.jwt = null;
      state.user = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
