import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks";
import { ChildrenProps, User, Quote, Favorite } from "../types";
import { getAllUsers, getAllQuotes, getAllFavorites } from "../api-actions";

export type SoulProviderType = {
  users: User[];
  quoteList: Quote[];
  favorites: Favorite[];
  activeUser: User;
  activeFavoriteCodes: string[];
  refreshUsers: () => void;
  refreshQuotes: () => void;
  refreshFavorites: () => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

export const SoulContext = createContext({} as SoulProviderType);

export const SoulProvider = ({ children }: ChildrenProps) => {
  const [users, setUsers] = useState([] as User[]);
  const [quoteList, setQuoteList] = useState([] as Quote[]);
  const [favorites, setFavorites] = useState([] as Favorite[]);
  const [activeUser, setActiveUser] = useState({} as User);
  const [activeFavoriteCodes, setActiveFavoriteCodes] = useState(
    [] as string[]
  );

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

  const loginUser = (user: User) => {
    setActiveUser(user);
    localStorage.setItem("active-user", JSON.stringify(user));
    const userFavorites = favorites.filter(
      (favorite) => favorite.username === user.username
    );
    setActiveFavoriteCodes(userFavorites.map((favorite) => favorite.code));
  }

  const logoutUser = () => {
    setActiveUser({} as User);
    localStorage.removeItem("active-user");
    setActiveFavoriteCodes([] as string[]);
  }

  const checkForLocalUser = () => {
    const user = localStorage.getItem("active-user");
    if (user) loginUser(JSON.parse(user));
  };

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
    loginUser,
    logoutUser
  };

  return (
    <SoulContext.Provider value={providerValue}>
      {children}
    </SoulContext.Provider>
  );
};
