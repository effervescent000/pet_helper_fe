import { createContext } from "react";

export const UserContext = createContext({
    loggedIn: false,
    toggleLogIn: () => {},
    user: {},
    setUser: () => {},
});
