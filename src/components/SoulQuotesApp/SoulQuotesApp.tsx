import "./SoulQuotesApp.css";
import { useState } from "react";
import Navbar from "../Navbar";

function SoulQuotesApp() {
  const [page, setPage] = useState("home");

  return (
    <div id="SQApp">
        <Navbar page={page} changePage={setPage} />
    </div>
  );
}

export default SoulQuotesApp;
