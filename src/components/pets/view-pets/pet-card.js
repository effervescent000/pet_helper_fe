import React from "react";

const PetCard = ({ pet, index }) => {
    return (
        <div className="pet-wrapper">
            <div className="image-wrapper">
                {/* image goes here */}
                <span>#{index}</span>
            </div>
            <div className="text-wrapper">
                <span>{pet.name}</span>
                <span>
                    {pet.type} {pet.species}
                </span>
            </div>
        </div>
    );
};

export default PetCard;
