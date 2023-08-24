import logo from "./assets/images/logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSoul } from "./custom-hooks";
import HomePage from "./components/Home/HomePage";
import AccountPage from "./components/Accounts/AccountPage";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import CreatePage from "./components/Create/CreatePage";
import LoginNotification from "./components/LoginNotification";
import "./App.css";

function App() {
  const { activeUser, logoutUser } = useSoul();

  return (
    <Router>
      <>
        <header className="navbar flex-between-center">
          <div className="logo-box">
            <img src={logo} alt="Logo" />
          </div>

          <nav className="nav-links">
            <ul className="flex-between-center">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                {!activeUser.username ? (
                  <Link to="/account" className="nav-link">
                    Join/Login
                  </Link>
                ) : (
                  <button className="nav-link" onClick={logoutUser}>
                    Logout
                  </button>
                )}
              </li>
              <li>
                <Link to="/favorites" className="nav-link">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/create" className="nav-link">
                  Create
                </Link>
              </li>
            </ul>
          </nav>
        </header>

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
