import React, { useState } from "react";
import { useAppProvider } from "../../custom-hooks/useCustomContext";
import { useEffectOnce } from "../../custom-hooks/useEffectOnce";
import { Quote } from "../../types";
import "./HomePage.css";
import CategorySelect from "../CategorySelect";

function HomePage() {
  const { quoteList } = useAppProvider();
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
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
    const categoryQuotes =
      searchCategory === "all"
        ? quoteList
        : quoteList.filter((quote) => quote.category === searchCategory);
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

  const filterQuotes = () => {
    let filteredQuotes = quoteList;

    if (searchCategory !== "all")
      filteredQuotes = quoteList.filter(
        (quote) => quote.category === searchCategory
      );

    changeAllHomeQuotes(filteredQuotes);
  };

  useEffectOnce(() => {
    filterQuotes();
  });

  return (
    <section className="page home">
      <header className="home-header">
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </header>

      <CategorySelect
        label="Search by Category"
        page="home"
        value={searchCategory}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSearchCategory(e.target.value);
        }}
        onClick={filterQuotes}
      />
    </section>
  );
}

export default HomePage;
