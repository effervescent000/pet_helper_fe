import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const Header = (props) => {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    return (
        <div className="header">
            <div className="brand">Herp Helper I guess?</div>
            <div className="menu" onClick={toggleOffcanvas}>
                Menu
            </div>
            <Offcanvas direction="end" isOpen={isOffcanvasOpen} toggle={toggleOffcanvas}>
                <OffcanvasHeader toggle={toggleOffcanvas}>Menu</OffcanvasHeader>
                <OffcanvasBody>
                    <div className="nyi">Schedule</div>
                    <div className="nyi">Add pet</div>
                    <div className="nyi">View pets</div>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    );
};

export default Header;
