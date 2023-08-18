import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { User } from "../types";

export interface ActiveUserState {
  value: User;
}

const initialState: ActiveUserState = {
  value: {} as User,
};

export const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    updateActiveUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { updateActiveUser } = activeUserSlice.actions;

export const loginActiveUser = (user: User) => (dispatch: AppDispatch) => {
  localStorage.setItem("active-user", JSON.stringify(user));
  dispatch(updateActiveUser(user));
};

export const logoutActiveUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("active-user");
  dispatch(updateActiveUser({} as User));
};

export default activeUserSlice.reducer;
