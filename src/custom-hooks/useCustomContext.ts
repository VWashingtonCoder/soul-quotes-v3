import { useContext } from "react";
import { UserContext, UserContextType } from "../providers/UsersProvider";
import { QuoteContext, QuoteContextType } from "../providers/QuotesProvider";
import {
  FavoritesContext,
  FavoritesContextType,
} from "../providers/FavoritesProvider";

export const useUser = (): UserContextType => {
  return useContext(UserContext);
};

export const useQuote = (): QuoteContextType => {
  return useContext(QuoteContext);
};

export const useFavorites = (): FavoritesContextType => {
  return useContext(FavoritesContext);
};
