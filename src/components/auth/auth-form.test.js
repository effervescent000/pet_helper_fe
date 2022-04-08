import { render, screen } from "@testing-library/react";
import { wrapWithUserContext } from "../../testutils";

import AuthForm from "./auth-form";

describe("Test status loading", () => {
    test("Confirm password shows up for SIGNUP", () => {
        render(wrapWithUserContext(<AuthForm status="SIGNUP" />));
        expect(screen.getByText(/confirm password/i)).toBeInTheDocument();
    });
    test("Confirm password doesn't show up for LOGIN", () => {
        render(wrapWithUserContext(<AuthForm status="LOGIN" />));
        expect(screen.queryByText(/confirm password/i)).not.toBeInTheDocument();
    });
});
