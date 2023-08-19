import { useState } from "react";
import Navbar from "../Navbar";
import HomePage from "../HomePage/HomePage";
import "./SoulQuotesApp.css";

const SoulQuotesApp = () => {
  const [page, setPage] = useState("home");

  return (
    <div id="SQApp">
        <Navbar page={page} changePage={setPage} />
        {/* {page === "home" && <HomePage />} */}
    </div>
  );
}

export default SoulQuotesApp;
