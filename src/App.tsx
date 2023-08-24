import logo from "./assets/images/logo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSoul } from "./custom-hooks";
import "./App.css";

function App() {
  const { activeUser, logoutUser } = useSoul();

  console.log(activeUser);
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
                    Account
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

          <Route path="/"/>
          <Route path="/account"/>
          <Route path="/favorites"/>
          <Route path="/create"/>
        </header>
      </>
    </Router>
  );
}

export default App;
