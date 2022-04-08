import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import { UserContext } from "../user-context";

const Header = (props) => {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const { loggedIn } = useContext(UserContext);

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
                    {loggedIn ? (
                        <>
                            <div className="nyi">Schedule</div>
                            <NavLink to="/pets/new" onClick={toggleOffcanvas}>
                                Add pet
                            </NavLink>
                            <div className="nyi">View pets</div>
                        </>
                    ) : (
                        <>
                            <div className="link-wrapper">
                                <NavLink to="/auth/login" onClick={toggleOffcanvas}>
                                    Login
                                </NavLink>
                            </div>
                            <div className="link-wrapper">
                                <NavLink to="/auth/signup" onClick={toggleOffcanvas}>
                                    Sign up
                                </NavLink>
                            </div>
                        </>
                    )}
                </OffcanvasBody>
            </Offcanvas>
        </div>
    );
};

export default Header;
