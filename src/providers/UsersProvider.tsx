import { createContext, useState } from "react";
import { useEffectOnce } from "../custom-hooks/useEffectOnce";
import { ChildrenProps, User } from "../types";

export type UserContextType = {
  activeUser: User;
  logoutActiveUser: () => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: ChildrenProps) => {
  const [activeUser, setActiveUser] = useState({} as User);

  const loginActiveUser = (user: User) => {
    localStorage.setItem("active-user", JSON.stringify(user));
    setActiveUser(user);
  };

  const logoutActiveUser = () => {
    localStorage.removeItem("active-user");
    setActiveUser({} as User);
  };

  useEffectOnce(() => {
    const user = localStorage.getItem("active-user");
    if (user) setActiveUser(JSON.parse(user));
    // else
    //   loginActiveUser({
    //     id: 2,
    //     username: "testUser3",
    //     email: "tu3@ex.co",
    //     password: "Password3",
    //   });
  });

  const providerValue = {
    activeUser,
    logoutActiveUser,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
