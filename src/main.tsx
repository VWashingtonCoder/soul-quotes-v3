import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./providers/UsersProvider.tsx";
import { QuoteProvider } from "./providers/QuotesProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </UserProvider>
  </React.StrictMode>
);
