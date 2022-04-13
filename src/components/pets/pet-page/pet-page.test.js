import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import PetPage from "./pet-page";
import { wrapWithMemoryRouter, petArray } from "../../../testutils";

jest.mock("axios");

describe("Basic rendering tests", () => {
    test("Valid pet renders", async () => {
        const pet = petArray[0];
        axios.get.mockResolvedValue({ data: pet });
        await waitFor(() =>
            render(wrapWithMemoryRouter(<PetPage />, { initialEntries: [`/pets/${pet.id}`] }))
        );
        expect(screen.getByText(new RegExp(pet.name))).toBeInTheDocument();
    });
    test("Invalid pet renders", async () => {
        axios.get.mockRejectedValue({ response: { data: { error: "invalid pet" } } });
        await waitFor(() =>
            render(wrapWithMemoryRouter(<PetPage />, { initialEntries: [`/pets/1000`] }))
        );
        expect(screen.getByText(/invalid pet/)).toBeInTheDocument();
    });
});
