import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    appLogin(state) {
      state.isLoggedIn = true;
    },
    appLogOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { appLogin, appLogOut } = authSlice.actions;

export default authSlice.reducer;
