import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, Quote, Favorite } from "../types";
import { 
  getAllQuotes,
  getFavoritesByUsername
} from "../server/api-actions";

export type QuoteContextType = {
  quoteList: Quote[];
  favoriteQuoteCodes: string[];
  addToFavorites: (username: string, quoteCode: string) => void;
};

export const QuoteContext = createContext({} as QuoteContextType);

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quoteList, setQuoteList] = useState([] as Quote[]);
  const [favoriteQuoteCodes, setFavoriteQuoteCodes] = useState([] as string[]);

  const refreshQuoteList = () => {
    getAllQuotes()
      .then((quotes) => setQuoteList(quotes))
      .catch((err) => {
        console.log(err);
        alert("Error getting quotes");
      });
  };

  const refreshFavoriteCodes = (username:string) => {
    getFavoritesByUsername(username)
      .then(favorites => {
        const favoriteCodes = favorites.map(
          (favorite: Favorite) => favorite.code
        );
        setFavoriteQuoteCodes(favoriteCodes)
      })
      .catch(err => {
        console.log(err);
        alert("Error getting favorites")
      })
  }

  const addToFavorites = (username: string, quoteCode: string) => {
    
    
    
    console.log(`username: ${username}`);
    console.log(`quoteCode: ${quoteCode}`);
  }

  useEffectOnce(() => {
    const user = localStorage.getItem("active-user");
    
    if (user) { 
      const { username } = JSON.parse(user);
      refreshFavoriteCodes(username) 
    }

    refreshQuoteList();
  });

  const providerValue = {
    quoteList,
    favoriteQuoteCodes,
    addToFavorites
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
