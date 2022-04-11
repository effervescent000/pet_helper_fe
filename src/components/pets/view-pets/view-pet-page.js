import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import PetCard from "./pet-card";
import Pagination from "../../pagination";

const ViewPetsPage = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [displayedPets, setDisplayedPets] = useState([]);
    const [page, setPage] = useState(1);
    const [petsPerPage, setPetsPerPage] = useState(3);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/pets/`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setAllPets(response.data);
            })
            .catch((error) => console.log(error.response));
    }, []);

    useEffect(() => {
        setFilteredPets(allPets);
    }, [allPets]);

    useEffect(() => {
        setDisplayedPets(
            filteredPets.slice(petsPerPage * (page - 1), petsPerPage * (page - 1) + petsPerPage)
        );
    }, [filteredPets, petsPerPage, page]);

    const onPageChange = (newPage) => {
        setPage(newPage);
    };

    const handleChange = (event) => {
        if (event.target.name === "page-size-select") {
            setPetsPerPage(event.target.value);
        }
    };

    return (
        <div className="view-pets-wrapper">
            <div className="pagination-wrapper">
                <select name="page-size-select" onChange={handleChange} value={petsPerPage}>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                </select>
                <Pagination
                    currentPage={page}
                    pageSize={petsPerPage}
                    onPageChange={onPageChange}
                    totalCount={filteredPets.length}
                />
            </div>

            {displayedPets.map((pet, index) => (
                <PetCard key={pet.id} pet={pet} index={index} />
            ))}
        </div>
    );
};

export default ViewPetsPage;
