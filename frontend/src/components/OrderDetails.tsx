import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import { Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const OrdersDetails = () => {
  const { currentUser }: any = useContext(AuthContext);

  return (
    <>
      <h1>Order Details</h1>
      <Button color="primary" onClick={() => auth.signOut()}>
        Logout
      </Button>
    </>
  );
};

export default withRouter(OrdersDetails);
