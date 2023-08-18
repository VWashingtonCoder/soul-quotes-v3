import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Favorite } from "../types";
import { getFavoritesByUsername } from "../server/api-actions";

export interface UserFavoriteCodesState {
  value: string[];
}

const initialState: UserFavoriteCodesState = {
  value: [] as string[],
};

export const userFavoriteCodesSlice = createSlice({
  name: "userFavoriteCodes",
  initialState,
  reducers: {
    updateUserFavoriteCodes: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserFavoriteCodes } = userFavoriteCodesSlice.actions;

export const getUserFavoriteCodes =
  (username: string) => (dispatch: AppDispatch) => {
    getFavoritesByUsername(username)
      .then((favorites) => {
        const favoriteCodes = favorites.map(
          (favorite: Favorite) => favorite.code
        );
        dispatch(updateUserFavoriteCodes(favoriteCodes));
      })
      .catch((err) => {
        console.log(err);
        alert("Error getting favorites");
      });
  };

export default userFavoriteCodesSlice.reducer;
