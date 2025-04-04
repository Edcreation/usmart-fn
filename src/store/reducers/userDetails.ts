import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/users/types';

interface UserDetailsState {
  userDetails: User | null;
}

const initialState: UserDetailsState = {
  userDetails: null,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setAppUserDetails(state, action: PayloadAction<User>) {
      state.userDetails = action.payload;
    },
    clearAppUserDetails(state) {
      state.userDetails = null;
    },
  },
});

export const { setAppUserDetails, clearAppUserDetails } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
