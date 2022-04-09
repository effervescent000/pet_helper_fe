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

const petArray = [
    {
        id: 1,
        name: "Test pet",
        type: "snake",
        species: "corn snake",
    },
    {
        id: 2,
        name: "Test pet 2",
        type: "snake",
        species: "corn snake",
    },
    {
        id: 3,
        name: "Test pet 3",
        type: "snake",
        species: "ball python",
    },
    {
        id: 4,
        name: "Test pet 4",
        type: "snake",
        species: "corn snake",
    },
    {
        id: 5,
        name: "Test pet 5",
        type: "lizard",
        species: "gecko",
    },
    {
        id: 6,
        name: "Test pet 6",
        type: "lizard",
        species: "gecko",
    },
];

export { wrapWithBrowserRouter, wrapWithMemoryRouter, wrapWithUserContext, petArray };
