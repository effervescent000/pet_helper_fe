import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "bootstrap/scss/bootstrap.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/main.scss";

import Header from "./components/header";
import DashboardPage from "./components/dashboard.js/dashboard-page";
import EditPetPage from "./components/pets/edit-pet/edit-pet-page";
import AuthPage from "./components/auth/auth-page";
import ViewPetsPage from "./components/pets/view-pets/view-pet-page";
import { UserContext } from "./user-context";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogIn = () => {
        setLoggedIn(!loggedIn);
    };

    useEffect(() => {
        if (!loggedIn) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/auth/check`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    if (Object.keys(response.data).length > 0) {
                        toggleLogIn();
                        setUser(response.data);
                    }
                })
                .catch((error) => console.log(error.response));
        }
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{ loggedIn, toggleLogIn, user, setUser }}>
                <div className="App">
                    <Header />
                    <div className="content-wrapper">
                        <Switch>
                            <Route exact path="/">
                                <DashboardPage />
                            </Route>
                            <Route path="/pets/:permalink">
                                <EditPetPage />
                            </Route>
                            <Route path="/pets">
                                <ViewPetsPage />
                            </Route>
                            <Route path="/auth/signup">
                                <AuthPage status="SIGNUP" />
                            </Route>
                            <Route path="/auth/login">
                                <AuthPage status="LOGIN" />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
