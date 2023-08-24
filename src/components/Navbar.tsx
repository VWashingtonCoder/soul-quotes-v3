import logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSoul } from "../custom-hooks";

type RouteType = {
  link: string;
  page: string;
  title: string;
};

const routes: RouteType[] = [
  { link: "/", page: "home", title: "Home" },
  { link: "/account", page: "account", title: "Join/Login" },
  { link: "/favorites", page: "favorites", title: "Favorites" },
  { link: "/create", page: "create", title: "Create" },
];

function Navbar() {
  const { activeUser, logoutUser } = useSoul();
  const activeLink = useLocation().pathname;
  const routeLink = routes.filter((route) => route.link === activeLink);
  const activePage = routeLink[0].page;

  return (
    <header className="navbar flex-between-center">
      <div className="logo-box">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="nav-links">
        <ul className="flex-between-center">
          {routes.map((route) => {
            const { page, title, link } = route;

            if (page === "account" && activeUser.username) {
              return (
                <li key={page}>
                  <button className="nav-link" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              );
            } else {
              return (
                <li key={page}>
                  <Link
                    to={link}
                    className={`nav-link ${
                      page === activePage ? "active" : ""
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
