import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, User, Quote, Favorite } from "../types";
import {
  getAllUsers,
  getAllQuotes,
  getAllFavorites,
} from "../server/api-actions";

export type SoulProvider = {
  users: User[];
  quoteList: Quote[];
  favorites: Favorite[];
  activeUser: User;
  activeFavoriteCodes: string[];
  refreshUsers: () => void;
  refreshQuotes: () => void;
  refreshFavorites: () => void;
};

export const SoulContext = createContext({} as SoulProvider);

export const SoulProvider = ({ children }: ChildrenProps) => {
  const [users, setUsers] = useState([] as User[]);
  const [quoteList, setQuoteList] = useState([] as Quote[]);
  const [favorites, setFavorites] = useState([] as Favorite[]);
  const [activeUser, setActiveUser] = useState({} as User);
  const [activeFavoriteCodes, setActiveFavoriteCodes] = useState([] as string[]);
  
  const refreshUsers = () => {
    getAllUsers()
      .then((users) => setUsers(users))
      .catch((err) => {
        console.log(err);
        alert("Error getting users");
      });
  };

  const refreshQuotes = () => {
    getAllQuotes()
      .then((quotes) => setQuoteList(quotes))
      .catch((err) => {
        console.log(err);
        alert("Error getting quotes");
      });
  };

  const refreshFavorites = () => {
    getAllFavorites()
      .then((favorites) => setFavorites(favorites))
      .catch((err) => {
        console.log(err);
        alert("Error getting favorites");
      });
  };

  const checkForLocalUser = () => {
    const user = localStorage.getItem("active-user");
    if (user) { 
      const localUser = JSON.parse(user);
      const localFavorites = favorites.filter(
        (favorite) => favorite.username === localUser.username
      );
      setActiveUser(localUser);
      setActiveFavoriteCodes(localFavorites.map((favorite) => favorite.code));
    }
  }

  useEffectOnce(() => {
    refreshUsers();
    refreshQuotes();
    refreshFavorites();
    checkForLocalUser();
  });

  const providerValue = {
    users,
    quoteList,
    favorites,
    activeUser,
    activeFavoriteCodes,
    refreshUsers,
    refreshQuotes,
    refreshFavorites,
  };

  return (
    <SoulContext.Provider value={providerValue}>
      {children}
    </SoulContext.Provider>
  );
};
