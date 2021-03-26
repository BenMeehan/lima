import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./authentication/ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";

import PrivateRoute from "../components/authentication/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact={true} component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
