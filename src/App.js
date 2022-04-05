import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";

import Header from "./components/header";
import DashboardPage from "./components/dashboard.js/dashboard-page";

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
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
