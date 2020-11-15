import React, { useContext, useEffect, useMemo, useState } from "react";
import { getOrderById } from "../services/firestore";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
} from "@material-ui/core";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { IFormStatus, IFormStatusProps, Order } from "../types";
import { getFormattedDate, phoneRegExp } from "../utils";
import Header from "./Header";
import Axios from "axios";

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
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

const formStatusProps: IFormStatusProps = {
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

const SignIn = ({ history, match }: RouteComponentProps) => {
  const classes = useStyles();
  let { id = '' } : any  = match.params;
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });
  const [order, setOrder] = useState<Order>({
    title: "",
    bookingDate: Date.now(),
    customer: {
      name: "",
      email: "",
      phone: "",
    },
    address: {
      zip: "",
      street: "",
      city: "",
      country: "",
    },
  });
  useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        const order = await getOrderById(id);
        setOrder(order);
      };
      fetchOrderDetail();
    }
  }, [order]);
  const isExisting = useMemo(() => {
    return !!id;
  }, [id]);

  const redirectToOrders = () => history.push(`/`)

  const { currentUser }: any = useContext(AuthContext);

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {order.title}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Formik
          enableReinitialize={true}
          initialValues={order}
          onSubmit={ async (values: Order, actions) => {
            if (isExisting) {
              try {
           
                let bookingDate = order.bookingDate.toString();
               
                let res = await Axios.put(`orders/${id}`, {
                  title: order.title,
                  bookingDate: new Date(bookingDate).getTime() / 1000,
                });
        
              } catch (e) {}
            } else {
              let res = await Axios.post(`orders`, order);
            }
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().min(3).required("Atleast 3 Character long"),
            bookingDate: Yup.string().required(),
            customer: Yup.object().shape({
              name: Yup.string().required(),
              email: Yup.string().email().required("Enter valid email address"),
              phone: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
            }),
            address: Yup.object().when( id , {
              is: !id,
              then: Yup.object().shape({
                street: Yup.string().required(),
                zip: Yup.string().required(),
                city: Yup.string().required(),
                country: Yup.string().required()
              }),
            })
          })}
        >
          {(props: FormikProps<Order>) => {
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
                <Grid container justify="space-around" direction="row">
                  <Grid item xs={10} className={classes.textField}>
                    <TextField
                      name="title"
                      id="title"
                      margin="normal"
                      variant="outlined"
                      label="Title"
                      fullWidth
                      value={values.title}
                      type="text"
                      helperText={
                        errors.title && errors.title ? errors.title : ""
                      }
                      error={errors.title && errors.title ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="bookingDate"
                      id="bookingDate"
                      margin="normal"
                      variant="outlined"
                      label="Booking Date"
                      fullWidth
                      value={getFormattedDate(values.bookingDate, "input")}
                      helperText={
                        errors.bookingDate && errors.bookingDate
                          ? errors.bookingDate
                          : ""
                      }
                      error={
                        errors.bookingDate && errors.bookingDate ? true : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                    />
                    <TextField
                      name="customer.name"
                      id="customer.name"
                      margin="normal"
                      variant="outlined"
                      label="Customer Name"
                      fullWidth
                      value={values?.customer?.name}
                      type="text"
                      helperText={
                        errors.customer?.name && errors.customer?.name
                          ? errors.customer?.name
                          : ""
                      }
                      error={
                        errors.customer?.name && errors.customer?.name
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="customer.email"
                      id="customer.email"
                      margin="normal"
                      variant="outlined"
                      label="Email Address"
                      value={values.customer.email}
                      type="email"
                      helperText={
                        errors.customer?.email && errors.customer?.email
                          ? errors.customer?.email
                          : ""
                      }
                      error={
                        errors.customer?.email && errors.customer?.email
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="customer.phone"
                      id="customer.phone"
                      margin="normal"
                      variant="outlined"
                      label="Customer Phone Number"
                      fullWidth
                      value={values?.customer?.phone}
                      type="text"
                      helperText={
                        errors.customer?.phone && errors.customer?.phone
                          ? errors.customer?.phone
                          : ""
                      }
                      error={
                        errors.customer?.phone && errors.customer?.phone
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <TextField
                      name="address.street"
                      id="address.street"
                      margin="normal"
                      variant="outlined"
                      label="Street"
                      fullWidth
                      value={values?.address?.street}
                      type="text"
                      helperText={
                        errors.address?.street && errors.address?.street
                          ? errors.address?.street
                          : ""
                      }
                      error={
                        errors.address?.street && errors.address?.street
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="address.zip"
                      id="address.zip"
                      margin="normal"
                      variant="outlined"
                      label="Zip Code"
                      fullWidth
                      value={values?.address.zip}
                      type="text"
                      helperText={
                        errors.address?.zip && errors.address?.zip
                          ? errors.address?.zip
                          : ""
                      }
                      error={
                        errors.address?.zip && errors.address?.zip
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="address.city"
                      id="address.city"
                      margin="normal"
                      variant="outlined"
                      label="City"
                      fullWidth
                      value={values?.address?.city}
                      type="text"
                      helperText={
                        errors.address?.city && errors.address?.city
                          ? errors.address?.city
                          : ""
                      }
                      error={
                        errors.address?.city && errors.address?.city
                          ? true
                          : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      name="address.country"
                      id="address.country"
                      margin="normal"
                      variant="outlined"
                      label="Country"
                      fullWidth
                      value={values?.address?.country}
                      type="text"
                      helperText={
                        errors.address?.country && errors.address?.country
                          ? errors.address?.country
                          : ""
                      }
                      error={
                        errors.address?.country && errors.address?.country
                          ? true
                          : false
                      }
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
                      type="button"
                      variant="contained"
                      onClick={redirectToOrders}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      
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
      </Container>
    </React.Fragment>
  );
};

export default withRouter(SignIn);
