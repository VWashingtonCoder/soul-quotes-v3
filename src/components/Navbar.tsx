import logo from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../custom-hooks/reduxHooks";
import { logoutActiveUser } from "../stateSlices/ActiveUserSlice";

type NavbarProps = {
  page: string;
  changePage: (page: string) => void;
};

const navLinks = [
  { key: "home", text: "Home" },
  { key: "accounts", text: "Account" },
  { key: "favorites", text: "Favorites" },
  { key: "create", text: "Create" },
];

const Navbar = ({ page, changePage }: NavbarProps) => {
  const activeUser = useAppSelector((state) => state.activeUser.value);
  const dispatch = useAppDispatch();
  const username = activeUser?.username || "";

  console.log("activeUser", activeUser);
  console.log("username", username);

  return (
    <header className="navbar flex-between-center">
      <div className="logo-box">
        <img src={logo} alt="site-logo" className="logo img" />
      </div>

      <nav className="nav-links flex-between-center">
        {navLinks.map((link) => {
          const { key } = link;
          const btnText = key === "accounts" && username ? "Logout" : link.text;

          return (
            <button
              key={key}
              className={`clear-btn nav-btn ${page === key ? "active" : ""}`}
              onClick={() => {
                key === "accounts" && username
                  ? dispatch(logoutActiveUser())
                  : changePage(key);
              }}
            >
              {btnText}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
