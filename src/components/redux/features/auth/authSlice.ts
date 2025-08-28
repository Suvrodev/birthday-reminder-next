import { TLoggedUser } from "@/components/utils/globalTypes/globalTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: null | TLoggedUser;
  token: null | string;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
