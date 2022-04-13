import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet, index }) => {
    return (
        <div className="pet-wrapper">
            <Link to={`/pets/${pet.id}`}>
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
            </Link>
        </div>
    );
};

export default PetCard;
