import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar page={page} changePage={setPage}/>
    </>
  );
}

export default App;
