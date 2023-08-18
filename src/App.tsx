import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar page={page} changePage={setPage}/>
      {page === "home" && <HomePage />}
    </>
  );
}

export default App;
