import React, { useCallback, useContext, useState } from "react";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import app from "../services/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { UserDetails } from "../types";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = ({ history }: RouteComponentProps) => {

  const classes = useStyles();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    password: "",
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, password } = userDetails;
      try {
        await app.auth().signInWithEmailAndPassword(username, password);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [userDetails, history]
  );

  const { currentUser } : any = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleChange = (inputType: string, value: string) => {
    setUserDetails({
      ...userDetails,
      [inputType]: value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              handleChange("username", e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(LogIn);
