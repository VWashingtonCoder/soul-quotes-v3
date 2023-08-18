import { configureStore } from "@reduxjs/toolkit";
import { quoteListSlice } from "./stateSlices/quoteListSlice";
import { activeUserSlice } from "./stateSlices/ActiveUserSlice";
import { userFavoriteCodesSlice } from "./stateSlices/userFavoriteCodesSlice";

const store = configureStore({
  reducer: {
    quoteList: quoteListSlice.reducer,
    activeUser: activeUserSlice.reducer,
    userFavoriteCodes: userFavoriteCodesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
