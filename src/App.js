import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/main.scss";

import Header from "./components/header";
import DashboardPage from "./components/dashboard.js/dashboard-page";
import EditPetPage from "./components/edit-pet/edit-pet-page";

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
