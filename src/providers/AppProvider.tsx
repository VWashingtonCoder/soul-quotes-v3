import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, User, Quote, Favorite } from "../types";
import { getAllQuotes, getFavoritesByUsername } from "../server/api-actions";

export type AppContextType = {
  activeUser: User;
  quoteList: Quote[];
  userFavoriteCodes: string[];
  loginActiveUser: (user: User) => void;
  logoutActiveUser: () => void;
  refreshQuoteList: () => void;
  refreshFavoriteCodes: (username: string) => void;
};

export const AppContext = createContext({} as AppContextType);

export const AppProvider = ({ children }: ChildrenProps) => {
  const [activeUser, setActiveUser] = useState({} as User);
  const [quoteList, setQuoteList] = useState([] as Quote[]);
  const [userFavoriteCodes, setUserFavoriteCodes] = useState([] as string[]);

  const loginActiveUser = (user: User) => {
    localStorage.setItem("active-user", JSON.stringify(user));
    setActiveUser(user);
  };

  const logoutActiveUser = () => {
    localStorage.removeItem("active-user");
    setActiveUser({} as User);
  };

  const refreshQuoteList = () => {
    getAllQuotes()
      .then((quotes) => setQuoteList(quotes))
      .catch((err) => {
        console.log(err);
        alert("Error getting quotes");
      });
  };

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
      const localUser = JSON.parse(user);
      refreshFavoriteCodes(localUser.username);
      loginActiveUser(localUser);
    } else {
        const testUser = {
            id: 2,
            username: "testUser3",
            email: "tu3@ex.co",
            password: "Password3",
        }
        refreshFavoriteCodes(testUser.username);
        loginActiveUser(testUser);
    }

    refreshQuoteList();
  });

  const providerValue = {
    activeUser,
    quoteList,
    userFavoriteCodes,
    loginActiveUser,
    logoutActiveUser,
    refreshQuoteList,
    refreshFavoriteCodes,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
