import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { wrapWithMemoryRouter, wrap, wrapWithUserContext } from "../testutils";
import Header from "./header";

describe("Basic loading tests", () => {
    describe("Loads while logged out", () => {
        beforeEach(() => {
            render(wrapWithUserContext(wrapWithMemoryRouter(<Header />)));
        });
        test("starts with Offcanvas closed", () => {
            expect(screen.queryByText(/sign up/i)).toBeNull();
        });
        test("offcanvas opens on click", async () => {
            const menuButton = screen.getByText(/menu/i);
            userEvent.click(menuButton);
            await waitFor(() => expect(screen.getByText(/sign up/i)).toBeInTheDocument());
        });
    });
    describe("Loads while logged in", () => {
        beforeEach(() => {
            render(
                wrapWithUserContext(wrapWithMemoryRouter(<Header />), {
                    user: { username: "Admin" },
                    loggedIn: true,
                })
            );
        });
        test("starts with Offcanvas closed", () => {
            expect(screen.queryByText(/add pet/i)).toBeNull();
        });
        test("offcanvas opens on click", async () => {
            const menuButton = screen.getByText(/menu/i);
            userEvent.click(menuButton);
            await waitFor(() => expect(screen.getByText(/add pet/i)).toBeInTheDocument());
        });
    });
});

// TODO test to ensure that the sidebar closes when a link is clicked
