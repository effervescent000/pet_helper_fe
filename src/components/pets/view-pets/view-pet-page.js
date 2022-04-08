import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import PetCard from "./pet-card";

const ViewPetsPage = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [displayedPets, setDisplayedPets] = useState([]);
    const [page, setPage] = useState(0);
    const [petsPerPage, setPetsPerPage] = useState(10);

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
        setDisplayedPets(filteredPets.slice(petsPerPage * page, petsPerPage * page + petsPerPage));
    }, [filteredPets]);

    return (
        <div className="view-pets-wrapper">
            {displayedPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    );
};

export default ViewPetsPage;
