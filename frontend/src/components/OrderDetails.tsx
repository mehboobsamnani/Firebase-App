import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import { auth, db, getOrderById } from "../services/firestore";
import { Redirect, withRouter, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Header from "./Header";
import { Order } from "../types";
import { getFormattedDate } from "../utils";
import { isDeleteExpression } from "typescript";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  orderDetail: {
    padding: theme.spacing(8, 0, 6),
  },
  valueStyling: {
    fontWeight: "bold",
  },
}));
const OrdersDetails = () => {
  let { id }: any = useParams();
  const classes = useStyles();
  const [order, setOrder] = useState<Order>({
    title: "",
    bookingDate: null,
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
  const isExisting = useMemo(() => {
    return !!id;
  },[id]);
  useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        const order = await getOrderById(id);
        setOrder(order);
      };
      fetchOrderDetail();
    }
  }, []);

  const handleChange = (inputType: string, value: string) => {
    setOrder({
      ...order,
      [inputType]: value,
    });
  };
  const handleCustomerChange = (inputType: string, value: string) => {
    setOrder({
      ...order,
      customer: { ...order.customer, [inputType]: value },
    });
  };
  const handleAddressChange = (inputType: string, value: string) => {
    setOrder({
      ...order,
      address: { ...order.address, [inputType]: value },
    });
  };
  return (
    <>
      <Header />
      <Container maxWidth="sm" component="main" className={classes.orderDetail}>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.valueStyling}
            >
              Title
            </Typography>
            <TextField
              fullWidth
              value={order?.title}
              onChange={(e) => {
                handleChange("title", e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.valueStyling}
            >
              Booking Date
            </Typography>
            <TextField
              fullWidth
              value={getFormattedDate(order?.bookingDate, "input")}
              onChange={(e) => {
                handleChange("bookingDate", e.target.value);
              }}
              id="filled-basic"
              type="date"
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.valueStyling}
            >
              Customer
            </Typography>
            <TextField
              fullWidth
              value={order.customer?.name}
              onChange={(e) => {
                handleCustomerChange("name", e.target.value);
              }}
              label="Name"
              id="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={order.customer?.email}
              onChange={(e) => {
                handleCustomerChange("email", e.target.value);
              }}
              label="Email Address"
              id="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={order.customer?.phone}
              onChange={(e) => {
                handleCustomerChange("phone", e.target.value);
              }}
              label="Phone"
              id="phone"
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.valueStyling}
            >
              Address
            </Typography>
            <TextField
              fullWidth
              value={order.address?.zip}
              onChange={(e) => {
                handleChange("customer.name", e.target.value);
              }}
              label="Zip"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              value={order.address?.street}
              onChange={(e) => {
                handleChange("customer.name", e.target.value);
              }}
              label="Street"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={order.address?.city}
              onChange={(e) => {
                handleChange("customer.email", e.target.value);
              }}
              label="City"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              value={order.address?.country}
              onChange={(e) => {
                handleChange("customer.country", e.target.value);
              }}
              label="Country"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default withRouter(OrdersDetails);
