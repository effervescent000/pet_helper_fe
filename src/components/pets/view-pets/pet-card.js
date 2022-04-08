import React from "react";

const PetCard = ({ pet }) => {
    return (
        <div className="pet-wrapper">
            <span>{pet.name}</span>
            <span>{pet.type}</span>
            <span>{pet.species}</span>
        </div>
    );
};

export default PetCard;
