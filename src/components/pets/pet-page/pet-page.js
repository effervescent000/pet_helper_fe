import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { formatDate } from "../../../utils";

const PetPage = (props) => {
    const history = useHistory();
    const { permalink } = useParams();
    const [pet, setPet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/pets/${permalink}`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setLoading(false);
                setPet(response.data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response.data.error);
            });
    }, [permalink]);

    const handleClick = (event) => {
        if (event.target.name === "back-btn") {
            history.push("/pets");
        } else if (event.target.name === "delete-btn") {
            axios
                .delete(`${process.env.REACT_APP_DOMAIN}/pets/${pet.id}`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    history.push("/pets");
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <div className="pet-page">
            {loading ? (
                <>Loading...</>
            ) : error ? (
                <>{error}</>
            ) : (
                <>
                    <div className="manage-wrapper">
                        <Link to={`/pets/${pet.id}/edit`} className="button-styled-link">
                            Edit pet
                        </Link>
                        <button name="delete-btn" onClick={handleClick}>
                            Delete pet
                        </button>
                    </div>
                    <div className="pet-stats">
                        <span>Name: {pet.name}</span>
                        <span>Species: {pet.species}</span>
                        <span>Weight: {pet.weight}g</span>
                        <span>Feed frequency: every {pet.feed_frequency} days</span>
                        <span>Notes: {pet.notes}</span>

                        <span>Date born/hatched: {formatDate(pet.date_born)}</span>
                        <span>Date acquired: {formatDate(pet.date_acquired)}</span>
                        {pet.date_removed ? (
                            <span>Date removed: {formatDate(pet.date_removed)}</span>
                        ) : null}
                        <span>Date fed: {formatDate(pet.date_fed)}</span>
                        <span>Date cleaned: {formatDate(pet.date_cleaned)}</span>
                        <span>Date weighed: {formatDate(pet.date_weighed)}</span>
                        <span>Date shed: {formatDate(pet.date_shed)}</span>
                        <span>Date eliminated: {formatDate(pet.date_eliminated)}</span>
                        <button name="back-btn" onClick={handleClick}>
                            {"< Back"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PetPage;
