import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./pagination";

describe("Tests for pagination component with different page totals", () => {
    const props = {
        currentPage: 1,
        pageSize: 6,
        totalCount: 100,
        onPageChange: jest.fn(),
        siblingCount: 1,
    };
    test("Test with 1 page (6 total 6 pageSize)", () => {
        render(<Pagination {...props} pageSize="6" totalCount="6" />);
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });
    test("Test with 2 pages (12 total 6 pageSize)", () => {
        render(<Pagination {...props} pageSize={6} totalCount={12} />);
        expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });
    test("Test with 100 total 6 pageSize", () => {
        render(<Pagination {...props} totalCount="100" />);
        // expect to see "< (1) 2 3 4 5 ... 17 >"
        expect(screen.getAllByRole("listitem")).toHaveLength(9);
    });
    test("Test with 100 total 6 pageSize 5, 8 currentPage", () => {
        render(<Pagination {...props} totalCount="100" currentPage={8} />);
        // expect to see "< 1 ... 7 (8) 9 ... 17 >"
        expect(screen.getAllByRole("listitem")).toHaveLength(props.siblingCount * 2 + 1 + 6);
    });
});
