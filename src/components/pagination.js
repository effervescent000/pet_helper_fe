import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = ({ currentPage, pageSize, totalCount, onPageChange, siblingCount = 1 }) => {
    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    return (
        <ul className="pagination-container">
            <li className="pagination-item" onClick={onPrevious}>
                {"<"}
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={index} className="pagination-item dots">
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={index}
                        className={`pagination-item${
                            pageNumber === currentPage ? " selected" : ""
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li className="pagination-item" onClick={onNext}>
                {">"}
            </li>
        </ul>
    );
};

export default Pagination;
