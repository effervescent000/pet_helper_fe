import { MemoryRouter, BrowserRouter } from "react-router-dom";

import { UserContext } from "./user-context";

const wrapWithMemoryRouter = (ui) => {
    return <MemoryRouter>{ui}</MemoryRouter>;
};

const wrapWithBrowserRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "test", route);
    return <BrowserRouter>{ui}</BrowserRouter>;
};

const wrapWithUserContext = (ui, { user = {}, loggedIn = false } = {}) => {
    return (
        <UserContext.Provider
            value={{ loggedIn, toggleLogIn: jest.fn(), user, setUser: jest.fn() }}
        >
            {ui}
        </UserContext.Provider>
    );
};

export { wrapWithBrowserRouter, wrapWithMemoryRouter, wrapWithUserContext };
