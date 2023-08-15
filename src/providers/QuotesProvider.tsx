import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, Quote } from "../types";
import { getAllQuotes } from "../server/api-actions";

export type QuoteContextType = {
  quoteList: Quote[];
};

export const QuoteContext = createContext({} as QuoteContextType);

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quoteList, setQuoteList] = useState([] as Quote[]);

  const refreshQuoteList = () => {
    getAllQuotes()
      .then((quotes) => setQuoteList(quotes))
      .catch((err) => {
        console.log(err);
        alert("Error getting quotes");
      });
  };

  useEffectOnce(() => {
    refreshQuoteList();
  });

  const providerValue = {
    quoteList,
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
