import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { wrapWithMemoryRouter } from "../testutils";
import Header from "./header";

describe("Basic loading tests", () => {
    beforeEach(() => {
        render(wrapWithMemoryRouter(<Header />));
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
