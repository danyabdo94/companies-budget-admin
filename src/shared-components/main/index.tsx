import { Switch, Route } from "react-router-dom";
import { Companies } from "../../modules/companies/pages";
import Header from "../header";

function Main(): JSX.Element {
    return (
        <div>
            <Header></Header>
            <Switch>
                <Route path="/">
                    <Companies />
                </Route>
            </Switch>
        </div>
    );
}

export default Main;
