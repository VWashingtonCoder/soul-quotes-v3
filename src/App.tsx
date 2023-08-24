import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSoul } from "./custom-hooks";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home/HomePage";
import AccountPage from "./components/Accounts/AccountPage";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import CreatePage from "./components/Create/CreatePage";
import LoginNotification from "./components/LoginNotification";
import "./App.css";

function App() {
  const { activeUser } = useSoul();

  return (
    <Router>
      <>
        <Navbar />

        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/account" Component={AccountPage} />
          <Route 
            path="/favorites" 
            Component={activeUser.username ? FavoritesPage : LoginNotification}
          />
          <Route 
            path="/create"
            Component={activeUser.username ? CreatePage : LoginNotification} 
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
