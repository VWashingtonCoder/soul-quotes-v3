import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Quote } from "../types";
import { getAllQuotes } from "../server/api-actions";

export interface QuoteListState {
  value: Quote[];
}

const initialState: QuoteListState = {
  value: [],
};

export const quoteListSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    refreshQuoteList: (state, action: PayloadAction<Quote[]>) => {
      state.value = action.payload;
    },
  },
});

export const { refreshQuoteList } = quoteListSlice.actions;

export const updateQuoteList = () => (dispatch: AppDispatch) => {
  getAllQuotes()
    .then((quotes) => dispatch(refreshQuoteList(quotes)))
    .catch((err) => {
      console.log(err);
      alert("Error getting quotes");
    });
};

export default quoteListSlice.reducer;
