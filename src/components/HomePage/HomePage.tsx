import { useState, useEffect } from "react";
import { Quote } from "../../types";
import {
  useQuote,
  useUser,
  useFavorites,
} from "../../custom-hooks/useCustomContext";
import CategorySelect from "../CategorySelect";
import QuoteCard from "../QuoteCard";
import "./HomePage.css";

function HomePage() {
  const { quoteList } = useQuote();
  const { activeUser } = useUser();
  const { userFavoriteCodes } = useFavorites();
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
  const [categoryQuotes, setCategoryQuotes] = useState([] as Quote[]);
  const [searchCategory, setSearchCategory] = useState("all");

  const changeAllHomeQuotes = (quotes: Quote[]) => {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const randomQuotes = randomIndexes.map((index) => quotes[index]);
    setHomeQuotes(randomQuotes);
  };

  const changeOneHomeQuote = (idx: number) => {
    const possibleQuotes = categoryQuotes.filter(
      (quote) => !homeQuotes.includes(quote)
    );
    const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
    const newHomeQuotes = homeQuotes.map((quote, index) =>
      index === idx ? possibleQuotes[randomIndex] : quote
    );
    setHomeQuotes(newHomeQuotes);
  };

  const getCategoryQuotes = () => {
    if (searchCategory !== "all") {
      const quotes = quoteList.filter(
        (quote) => quote.category === searchCategory
      );
      changeAllHomeQuotes(quotes);
      setCategoryQuotes(quotes);
    } else {
      changeAllHomeQuotes(quoteList);
      setCategoryQuotes([] as Quote[]);
    }
  };

  useEffect(() => {
    console.log(categoryQuotes);
    console.log(homeQuotes);
  }, [homeQuotes, categoryQuotes]);

  //   const toggleFavorite = (favoriteStatus: boolean, idx: number) => {
  //     if (!favoriteStatus) addToFavorites(homeQuotes[idx].quoteId);
  //     else removeFromFavorites(homeQuotes[idx].quoteId);
  //   };

  return (
    <section className="page home">
      <div className="home-header">
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </div>

      <CategorySelect
        page="home"
        label="Search By Category: "
        btnClick={getCategoryQuotes}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      />

      <div className="quotes-box flex-between-center">
        {/* 
        {homeQuotes.map((quote, idx) => {
          const isFavorite = userFavorites.includes(quote.quoteId);
          const isUser = username !== undefined;

          return (
            <QuoteCard
              key={`card-${idx}`}
              cardData={quote}
              idx={idx}
              isFavorite={isFavorite}
              isUser={isUser}
              changeOne={changeOneQuote}
              toggleFavorite={toggleFavorite}
            />
          );
        })} 
        */}
      </div>
    </section>
  );
}

export default HomePage;
