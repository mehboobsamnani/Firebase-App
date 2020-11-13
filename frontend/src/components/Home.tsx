import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser }: any = useContext(AuthContext);

  return (
    <>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/order/1">Order Details</Link>
        </li>
      </ul>
      <Button color="primary" onClick={() => auth.signOut()}>
        Logout
      </Button>
    </>
  );
};

export default Home;
