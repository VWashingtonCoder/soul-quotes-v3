import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Favorite } from "../types";
import { getFavoritesByUsername } from "../server/api-actions";

export interface UserFavoritesState {
  value: Favorite[];
}

const initialState: UserFavoritesState = {
  value: [] as Favorite[],
};

export const userFavoritesSlice = createSlice({
  name: "userFavorites",
  initialState,
  reducers: {
    updateUserFavoriteCodes: (state, action: PayloadAction<Favorite[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserFavoriteCodes } = userFavoritesSlice.actions;

export const getUserFavorites =
  (username: string) => (dispatch: AppDispatch) => {
    getFavoritesByUsername(username)
      .then((favorites) => {
        dispatch(updateUserFavoriteCodes(favorites));
      })
      .catch((err) => {
        console.log(err);
        alert("Error getting favorites");
      });
};

// export const addFavorite = (favorite: Favorite) => (dispatch: AppDispatch) => {
//   postNewFavorite(favorite)
//     .then(() => dispatch(getUserFavoriteCodes(favorite.username)))
//     .catch((err) => {
//       console.log(err);
//       alert("Error adding favorite");
//     });
// }

// export const removeFavorite = (id: number, username: string) => (dispatch: AppDispatch) => {
//   deleteFavorite(id)
//     .then(() => dispatch(getUserFavoriteCodes(username)))
//     .catch((err) => {
//       console.log(err);
//       alert("Error deleting favorite");
//     });
// }

export default userFavoritesSlice.reducer;
