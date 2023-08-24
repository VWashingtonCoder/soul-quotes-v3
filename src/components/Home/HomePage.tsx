import { useState } from "react";
import { useSoul, useEffectOnce } from "../../custom-hooks";
import { Quote } from "../../types";
import CategorySelect from "../CategorySelect";
import QuoteCard from "./QuoteCard";
import "./HomePage.css";

function HomePage() {
  const { quoteList } = useSoul();
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
  const [filterCategory, setFilterCategory] = useState("all");
  const filteredQuotes =
    filterCategory === "all"
      ? quoteList
      : quoteList.filter((quote) => quote.category === filterCategory);

  const changeAllHomeQuotes = () => {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const randomQuotes = randomIndexes.map((idx) => filteredQuotes[idx]);
    setHomeQuotes(randomQuotes);
  };

  const changeOneHomeQuote = (idx: number) => {
    const currentQuote = homeQuotes[idx];
    const possibleQuotes = filteredQuotes.filter(
      (quote) => quote !== currentQuote
    );
    const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
    const newQuote = possibleQuotes[randomIndex];
    console.log(homeQuotes);
    const newHomeQuotes = homeQuotes.map((quote, i) =>
      i === idx ? newQuote : quote
    );
    setHomeQuotes(newHomeQuotes);
  };

  useEffectOnce(() => {
    changeAllHomeQuotes();
  });

  return (
    <section className="page home">
      <h2 className="home-header">
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </h2>

      <CategorySelect
        btnClick={changeAllHomeQuotes}
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      />

      <div className="quote-list">
        {homeQuotes.map((quote, idx) => (
          <QuoteCard key={idx} cardData={quote} idx={idx} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
