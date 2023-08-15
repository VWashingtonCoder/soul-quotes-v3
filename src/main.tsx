import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./providers/UsersProvider.tsx";
import { QuoteProvider } from "./providers/QuotesProvider.tsx";
import { FavoritesProvider } from "./providers/FavoritesProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <QuoteProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </QuoteProvider>
    </UserProvider>
  </React.StrictMode>
);
