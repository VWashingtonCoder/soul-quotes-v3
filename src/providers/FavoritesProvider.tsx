import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, Favorite } from "../types";
import { getFavoritesByUsername } from "../server/api-actions";

export type FavoritesContextType = {
  userFavoriteCodes: string[];
  refreshFavoriteCodes: (username: string) => void;
};

export const FavoritesContext = createContext({} as FavoritesContextType);

export const FavoritesProvider = ({ children }: ChildrenProps) => {
  const [userFavoriteCodes, setUserFavoriteCodes] = useState([] as string[]);

  const refreshFavoriteCodes = async (username: string) => {
    const favorites = await getFavoritesByUsername(username);

    if (favorites.length > 0) {
      const favoriteCodes = favorites.map(
        (favorite: Favorite) => favorite.code
      );
      setUserFavoriteCodes(favoriteCodes);
    } else {
      setUserFavoriteCodes([]);
      alert("Error getting favorites");
    }
  };

  useEffectOnce(() => {
    const user = localStorage.getItem("active-user");
    if (user) {
      const { username } = JSON.parse(user);
      refreshFavoriteCodes(username);
    } else refreshFavoriteCodes("testUser3");
  });

  const providerValue = {
    userFavoriteCodes,
    refreshFavoriteCodes,
  };

  return (
    <FavoritesContext.Provider value={providerValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
