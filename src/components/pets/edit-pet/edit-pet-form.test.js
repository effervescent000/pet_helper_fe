import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditPetForm from "./edit-pet-form";
import { petArray } from "../../../testutils";

describe("Test loading create pet", () => {
    beforeEach(() => {
        render(<EditPetForm pet={null} />);
    });
    test("Type select field works", async () => {
        const typeSelect = screen.getByLabelText("Type of animal");
        const speciesSelect = screen.getByLabelText("Species");
        expect(typeSelect).toHaveDisplayValue("---");
        expect(speciesSelect).toHaveDisplayValue("---");

        userEvent.selectOptions(typeSelect, screen.getByRole("option", { name: "Snake" }));
        await waitFor(() => expect(typeSelect).toHaveDisplayValue("Snake"));
        await waitFor(() => expect(speciesSelect).toHaveDisplayValue("Corn snake"));

        userEvent.selectOptions(speciesSelect, screen.getByRole("option", { name: "Ball python" }));
        await waitFor(() => expect(speciesSelect).toHaveDisplayValue("Ball python"));
    });
});

describe("Testing importing pet to edit", () => {
    test("Type and species selects import properly", () => {
        render(<EditPetForm pet={petArray[0]} />);
        const typeSelect = screen.getByLabelText("Type of animal");
        const speciesSelect = screen.getByLabelText("Species");
        expect(typeSelect).toHaveDisplayValue("Snake");
        expect(speciesSelect).toHaveDisplayValue("Corn snake");
    });
});
