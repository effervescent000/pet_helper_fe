import {
    queryByText,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
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
        describe("Offcanvas closes properly", () => {
            beforeEach(() => {
                userEvent.click(screen.getByText(/menu/i));
            });
            test("x button closes", async () => {
                const closeButton = screen.getByRole("button", { name: /close/i });
                userEvent.click(closeButton);
                expect(screen.queryByText(/sign up/)).toBeNull();
            });
            test("Sign up link closes", () => {
                const link = screen.getByRole("link", { name: /sign up/i });
                userEvent.click(link);
                expect(screen.queryByText(/sign up/)).toBeNull();
            });
            test("Login link closes", () => {
                const link = screen.getByRole("link", { name: /login/i });
                userEvent.click(link);
                expect(screen.queryByText(/sign up/)).toBeNull();
            });
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
        describe("Offcanvas closes properly", () => {
            beforeEach(() => {
                userEvent.click(screen.getByText(/menu/i));
            });
            test("x button closes", async () => {
                const closeButton = screen.getByRole("button", { name: /close/i });
                userEvent.click(closeButton);
                expect(screen.queryByText(/add pet/)).toBeNull();
            });
            test("add pet link closes", () => {
                const link = screen.getByRole("link", { name: /add pet/i });
                userEvent.click(link);
                expect(screen.queryByText(/add pet/)).toBeNull();
            });
        });
    });
});

// TODO test to ensure that the sidebar closes when a link is clicked
