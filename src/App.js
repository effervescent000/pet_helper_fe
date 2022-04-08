import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/main.scss";

import Header from "./components/header";
import DashboardPage from "./components/dashboard.js/dashboard-page";
import EditPetPage from "./components/edit-pet/edit-pet-page";
import { UserContext } from "./user-context";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogIn = () => {
        setLoggedIn(!loggedIn);
    };

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
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
