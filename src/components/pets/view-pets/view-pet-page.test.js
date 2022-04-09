import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ViewPetsPage from "./view-pet-page";
import { petArray } from "../../../testutils";

jest.mock("axios");

describe("View pets loading testing", () => {
    beforeEach(async () => {
        axios.get.mockResolvedValue({
            data: petArray,
        });
        await waitFor(() => render(<ViewPetsPage />));
    });
    test("displays pets properly", async () => {
        expect(await screen.findByText(petArray[0].name)).toBeInTheDocument();
        expect(await screen.findByText(petArray[4].name)).toBeInTheDocument();
    });
});
