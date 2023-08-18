import { useContext } from "react";
import { AppContext, AppContextType } from "../providers/AppProvider";

export const useAppProvider = (): AppContextType => {
  return useContext(AppContext);
};
