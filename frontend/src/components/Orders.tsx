import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { auth, db } from "../firebase";
import { Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Orders = () => {
  const { currentUser }: any = useContext(AuthContext);
  const [userData] = useState();
//   useEffect(() => {
//     db.collection("users")
//       .get()
//       .then((querySnapshot) => {
//         const data = querySnapshot.docs.map((doc) => doc.data());
//         console.log(data); // array of cities objects
//       });
//   }, []);
  return (
    <>
      <h1>Orders</h1>
      <Button color="primary" onClick={() => auth.signOut()}>
        Logout
      </Button>
    </>
  );
};

export default withRouter(Orders);
