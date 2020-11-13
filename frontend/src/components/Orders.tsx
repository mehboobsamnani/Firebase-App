import React, { useEffect, useState } from "react";
import { db, getOrders, auth } from "../services/firestore";
import { getFormattedDate } from "../utils";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [ordersList, setOrdersList]: any = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrdersList(orders);
    };
    fetchOrders();
  }, []);
  let history = useHistory();
  const redirectToOrder = (id: string = "") => {
    history.push(`/order/${id}`);
  };
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
          Orders{" "}
          <Button
            onClick={() => {
              redirectToOrder()
            }}
            color="primary"
            variant="outlined"
          >
            New Order
          </Button>
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Booking Date</TableCell>
                  {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList.map((orderItem: any) => (
                  <TableRow
                    key={orderItem.id}
                    onClick={() => {
                      redirectToOrder(orderItem.id);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {orderItem.title}
                    </TableCell>
                    <TableCell>{orderItem.customer?.name}</TableCell>
                    <TableCell>
                      {orderItem.address?.zip} {orderItem.address?.street}
                      {orderItem.address?.city} {orderItem.address?.country}
                    </TableCell>
                    <TableCell>
                      {getFormattedDate(orderItem.bookingDate)}
                    </TableCell>
                    {/* <TableCell align="right">{orderItem.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default withRouter(Orders);
