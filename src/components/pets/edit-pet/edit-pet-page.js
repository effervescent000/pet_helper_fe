import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useHistory } from "react-router-dom";

import EditPetForm from "./edit-pet-form";

const EditPetPage = (props) => {
    const { permalink } = useParams();
    const [pet, setPet] = useState({});

    useEffect(() => {
        if (permalink !== "new") {
            getPet();
        }
    }, []);

    const getPet = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/pets/${permalink}`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setPet(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="pet-edit-wrapper">
            <EditPetForm pet={Object.keys(pet).length > 0 ? pet : null} />
        </div>
    );
};

export default EditPetPage;
