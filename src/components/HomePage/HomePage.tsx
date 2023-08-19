import { useState } from "react";
import { useEffectOnce } from "../../custom-hooks/useEffectOnce";
import { useAppDispatch, useAppSelector } from "../../custom-hooks/reduxHooks";
import { postNewFavorite, deleteFavorite } from "../../server/api-actions";
import { getUserFavorites } from "../../stateSlices/userFavoritesSlice";
import { Quote } from "../../types";
import CategorySelect from "../CategorySelect";
import QuoteCard from "./QuoteCard";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const quoteList = useAppSelector((state) => state.quoteList.value);
  const activeUser = useAppSelector((state) => state.activeUser.value);
  const userFavorites = useAppSelector((state) => state.userFavorites.value);
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
  const [category, setCategory] = useState("all");
  const categoryQuotes =
    category === "all"
      ? quoteList
      : quoteList.filter((quote) => quote.category === category);
  const userFavoriteCodes = userFavorites.map((favorite) => favorite.code);


  const changeOneHomeQuote = (idx: number) => {
    const possibleQuotes = categoryQuotes.filter(
      (quote) => !homeQuotes.includes(quote)
    );
    const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
    const newHomeQuotes = homeQuotes.map((quote, index) => {
      if (index === idx) {
        return possibleQuotes[randomIndex];
      }
      return quote;
    });
    setHomeQuotes(newHomeQuotes);
  };

  const changeAllHomeQuotes = () => {
    const possibleQuotes = categoryQuotes.filter(
      (quote) => !homeQuotes.includes(quote)
    );
    const randomIndexes: number[] = [];

    while (randomIndexes.length < 3) {
      const quoteIdx = Math.floor(Math.random() * possibleQuotes.length);
      if (!randomIndexes.includes(quoteIdx)) randomIndexes.push(quoteIdx);
    }
    const randomQuotes = randomIndexes.map((index) => possibleQuotes[index]);
    setHomeQuotes(randomQuotes);
  };

  const addToFavorites = (idx: number) => {
    const newFavorite = {
      username: activeUser.username,
      code: homeQuotes[idx].code,
    };
    console.log(newFavorite);
    // postNewFavorite(newFavorite)
    //   .then(() => dispatch(getUserFavorites(activeUser.username)))
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Error adding favorite");
    //   });
  };

  const removeFromFavorites = (idx: number) => {
    // deleteFavorite(favoriteId)
    //     .then(() => dispatch(getUserFavoriteCodes(activeUser.username)))
    //     .catch((err) => {
    //     console.log(err);
    //     alert("Error deleting favorite");
    //     });
    // };
  };

  useEffectOnce(() => {
    changeAllHomeQuotes();
  });

  return (
    <div className="page home">
      <header className="home-header">
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </header>

      <CategorySelect
        label="Filter By Category: "
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        btnClick={changeAllHomeQuotes}
      />

      <div className="quotes-box flex-between-center">
        {homeQuotes.map((quote, idx) => {
          const isFavorite = userFavoriteCodes.includes(quote.code);
          const isUser = Object.keys(activeUser).length > 0;
          return (
            <QuoteCard
              key={quote.code}
              cardData={quote}
              idx={idx}
                isFavorite={isFavorite}
              isUser={isUser}
              changeOne={changeOneHomeQuote}
              toggleFavorite={isFavorite ? removeFromFavorites : addToFavorites}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
