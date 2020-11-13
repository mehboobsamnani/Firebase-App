import React from "react";
import { BrowserRouter as Router, Route ,Switch  } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "../privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/order:id" component={OrderDetails} /> */}
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/orders" component={Orders} /> */}
          <PrivateRoute exact path="/orders" component={Orders} /> 
          {/* <PrivateRoute exact path="/orders" component={Orders} /> */}
          <PrivateRoute exact path="/order/:id" component={OrderDetails} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
