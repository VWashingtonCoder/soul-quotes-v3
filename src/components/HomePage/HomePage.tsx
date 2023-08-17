import { useState } from "react";
import { useEffectOnce } from "../../custom-hooks/useEffectOnce";
import { useQuote } from "../../custom-hooks/useCustomContext";
import { Quote } from "../../types";
import CategorySelect from "../CategorySelect";
import QuoteCard from "../QuoteCard";
import "./HomePage.css";

function HomePage() {
  const { quoteList } = useQuote();
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
  const [categoryQuotes, setCategoryQuotes] = useState(quoteList);
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
    const quotes =
      searchCategory === "all"
        ? quoteList
        : quoteList.filter((quote) => quote.category === searchCategory);
    changeAllHomeQuotes(quotes);
    setCategoryQuotes(quotes);
  };

  useEffectOnce(() => {
    changeAllHomeQuotes(quoteList);
  });

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
        {homeQuotes.map((quote, idx) => {
          console.log(quote)
          console.log(`idx: ${idx}`)
          return (
            <>
            </>

            // <QuoteCard 
            //   key={`card-${idx}`}
            //   cardData={quote}
            //   idx={idx}
            //   changeOne={changeOneHomeQuote}
            // />
          );
        })} 
      </div>
    </section>
  );
}

export default HomePage;
