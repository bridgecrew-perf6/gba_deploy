import "./App.css";
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from "./component/HeaderComponent";
import ItemComponent from "./component/ItemComponent";
import AddItemComponent from "./component/AddItemComponent";
import UpdateItemComponent from "./component/UpdateItemComponent";
import LoginComponent from "./component/LoginComponent";
import Welcome from "./component/Welcome";
import ClerkComponent from "./component/ClerkComponent";
import AddClerkComponent from "./component/AddClerkComponent";
import UpdateClerkComponent from "./component/UpdateClerkComponent";
import SignupComponent from "./component/SignupComponent";
import { Redirect } from "react-router-dom";
import NotFound from "../src/component/NotFound";
import Unauthorized from "./component/Unauthorized";
import AdminPage from "./component/AdminPage";
// import FooterComponent from "../src/component/FooterComponent";

function App() {
  return (
    <div>
        <Router>
          <div>
            <HeaderComponent />
            <div className="App pt-4">  
              <Switch>
                
                <Route exact path="/signup" component={ SignupComponent }></Route>
                <Route path="/login" component={LoginComponent}></Route>  
                <Route path="/welcome" component={ Welcome}></Route>
                <Route path="/items" component={ ItemComponent}></Route>
                <Route path="/add-items" component={ AddItemComponent }></Route>
                <Route path="/update-item/:id" component={ UpdateItemComponent }></Route>
                <Route path="/clerk" component={ ClerkComponent }></Route>
                <Route path="/add-clerk" component={ AddClerkComponent }></Route>
                <Route path="/update-clerk/:id" component={ UpdateClerkComponent }></Route>
                <Route path="/admin" component={ AdminPage }></Route>
                <Route path="/403" component={ Unauthorized }></Route>
                <Route path="/404" component = { NotFound } />
                <Redirect to="/404" />
              </Switch>     
            </div>
            {/* <FooterComponent/> */}
            </div>
        </Router>
    </div>
  );
}

export default App;
