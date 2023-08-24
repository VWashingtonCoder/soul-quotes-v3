import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SoulProvider } from "./provider/SoulProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoulProvider>
      <App />
    </SoulProvider>
  </React.StrictMode>
);
