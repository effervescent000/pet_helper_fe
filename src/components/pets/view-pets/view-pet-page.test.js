import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ViewPetsPage from "./view-pet-page";
import { petArray } from "../../../testutils";

jest.mock("axios");

describe("View pets testing", () => {
    beforeEach(async () => {
        axios.get.mockResolvedValue({
            data: petArray,
        });
        await waitFor(() => render(<ViewPetsPage />));
    });
    test("displays pets properly", async () => {
        expect(await screen.findByText(petArray[0].name)).toBeInTheDocument();
        expect(await screen.findByText(petArray[2].name)).toBeInTheDocument();
    });
    test("pageSize select works", async () => {
        const pageSizeSelect = screen.getByRole("combobox");
        expect(pageSizeSelect).toHaveDisplayValue("3");
        expect(screen.getAllByText(/#\d/)).toHaveLength(3);

        // change pageSize selector to 6 and test it
        userEvent.selectOptions(pageSizeSelect, screen.getByRole("option", { name: 6 }));
        await waitFor(() => expect(pageSizeSelect).toHaveDisplayValue(6));
        await waitFor(() => expect(screen.getAllByText(/#\d/)).toHaveLength(6));
    });
});
