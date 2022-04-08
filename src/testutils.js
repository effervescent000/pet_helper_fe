import { MemoryRouter, BrowserRouter } from "react-router-dom";

const wrapWithMemoryRouter = (ui) => {
    return <MemoryRouter>{ui}</MemoryRouter>;
};

const wrapWithBrowserRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "test", route);
    return <BrowserRouter>{ui}</BrowserRouter>;
};

export { wrapWithBrowserRouter, wrapWithMemoryRouter };
