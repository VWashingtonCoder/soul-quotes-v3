import "./App.css";
import { useEffectOnce } from "./custom-hooks/useEffectOnce";
import { useAppDispatch } from "./custom-hooks/reduxHooks";
import { loginActiveUser } from "./stateSlices/ActiveUserSlice";
import { getUserFavoriteCodes } from "./stateSlices/userFavoriteCodesSlice";
import { updateQuoteList } from "./stateSlices/quoteListSlice";
import SoulQuotesApp from "./components/SoulQuotesApp/SoulQuotesApp";

function App() {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    const activeUser = localStorage.getItem("active-user");
    if (activeUser) {
      dispatch(loginActiveUser(JSON.parse(activeUser)));
      dispatch(getUserFavoriteCodes(JSON.parse(activeUser).username));
    }
    dispatch(updateQuoteList());
  });

  return <SoulQuotesApp />;
}

export default App;
