import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import app from "../services/firestore";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { IFormStatus, IFormStatusProps, ISignInForm, Types } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "450px",
      display: "block",
      margin: "20px auto",
    },
    textField: {
      "& > *": {
        width: "100%",
      },
    },
    submitButton: {
      marginTop: "24px",
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

const formStatusProps: IFormStatusProps = {
  error: {
    message: "Something went wrong. Please try again.",
    type: Types.error,
  },
};

const SignIn = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: Types.success,
  });

  const { currentUser }: any = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const setUser = async (data: ISignInForm, resetForm: Function) => {
    try {
      await app.auth().signInWithEmailAndPassword(data.email, data.password);
      history.push("/");
    } catch (error) {
      setFormStatus(formStatusProps.error);
    }
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={(values: ISignInForm, actions) => {
          setUser(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Enter valid email address"),
          password: Yup.string().required(
            "Please valid password. One uppercase, one lowercase, one special character and no spaces"
          ),
        })}
      >
        {(props: FormikProps<ISignInForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <Typography component="h1" variant="h5" className={classes.title}>
                Log In
              </Typography>
              <Grid container justify="space-around" direction="row">
                <Grid
                  item
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="email"
                    id="email"
                    margin="normal"
                    variant="outlined"
                    label="Email Address"
                    value={values.email}
                    type="email"
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="password"
                    variant="outlined"
                    margin="normal"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? "Please enter password"
                        : ""
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === "error" ? (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      ) : formStatus.type === "success" ? (
                        <p className={classes.successMessage}>
                          {formStatus.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withRouter(SignIn);
