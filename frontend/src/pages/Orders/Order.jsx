import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderDetails,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../../redux/actions/orderAction";
import { Loader } from "../../components";
import { totalAmount } from "../../utils/utils";
import { format } from "date-fns";

const OrderSummary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, order: orderDets } = useSelector(
    (state) => state.orderDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: deliveredSuccess, error: deliveredError } = useSelector(
    (state) => state.orderUpdateToDelivered
  );
  const { success: paidSuccess, error: paidError } = useSelector(
    (state) => state.orderUpdateToPaid
  );

  useEffect(() => {
    if (!orderDets || deliveredSuccess || paidSuccess || id) {
      dispatch(getOrderDetails(id));
    }
    // eslint-disable-next-line
  }, [dispatch, id, deliveredSuccess, paidSuccess]);

  if (loading) return <Loader />;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    isDelivered,
    isPaid,
    deliveredAt,
    paidAt,
  } = orderDets;

  const { address, city, province, postalCode } = shippingAddress;

  const totalCart = orderItems.length;
  const totalItems = totalAmount(orderDets.orderItems);
  //static shipping value
  const shipping = 80;
  const total = totalItems + shipping;

  return (
    <Container>
      <Typography variant="h4">Order {id}</Typography>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1 }}>
              SHIPPING
            </Typography>
            <Typography variant="body1">
              Address: {address}, {city}, {province} {postalCode}
            </Typography>
            {isDelivered ? (
              <Alert severity="success" sx={{ marginY: 2 }}>
                Delivered At{" "}
                {format(new Date(deliveredAt), "yyyy-MM-dd hh:mm:ssaaa")}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ marginY: 2 }}>
                Not Delivered
              </Alert>
            )}
          </Box>
          <Divider />
          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1 }}>
              Payment Method
            </Typography>
            <Typography variant="body1">Method: {paymentMethod}</Typography>

            {isPaid ? (
              <Alert severity="success" sx={{ marginY: 2 }}>
                Paid At {format(new Date(paidAt), "yyyy-MM-dd hh:mm:ssaaa")}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ marginY: 2 }}>
                Not Paid
              </Alert>
            )}
          </Box>
          <Divider />

          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1, marginBottom: 3 }}>
              ORDER ITEMS
            </Typography>

            {orderDets.orderItems.map((item, i) => (
              <React.Fragment key={i}>
                <Grid container key={item.meal} sx={{ paddingY: 1 }}>
                  <Grid item xs={3} lg={3}>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.name}
                    />
                  </Grid>
                  <Grid item xs={4} lg={6}>
                    <Typography variant="body">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={4} lg={3}>
                    <Typography variant="body">
                      {item.qty} x {item.price} = {item.qty * item.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ display: totalCart - 1 === i ? "none" : "block" }}
                />
              </React.Fragment>
            ))}
          </Box>
        </Grid>

        <Grid item lg={4} sx={{ marginY: 2 }}>
          {paidError && (
            <Alert severity="error" sx={{ marginY: 2 }}>
              {paidError}
            </Alert>
          )}
          {deliveredError && (
            <Alert severity="error" sx={{ marginY: 2 }}>
              {deliveredError}
            </Alert>
          )}
          <Paper variant="outlined">
            <Box p={2}>
              <Typography variant="h4">ORDER SUMMARY</Typography>
            </Box>
            <Divider />
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    Items:{" "}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    &#8369; {totalItems.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    Shipping:{" "}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    &#8369; {shipping.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    Total:{" "}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  {" "}
                  <Typography variant="body" component="div">
                    &#8369; {total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {userInfo.isAdmin && (
              <>
                <Divider />
                <Box p={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    onClick={() => dispatch(updateOrderToDelivered(id))}
                    disabled={isDelivered}
                  >
                    Mark As Delivered
                  </Button>
                  {/* Mark as paid if Cash on Delivery  */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => dispatch(updateOrderToPaid(id))}
                    disabled={isPaid}
                  >
                    Mark As Paid
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        {/*    <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button> */}
        <Box sx={{ flex: "1 1 auto" }} />

        {/*   <Button color="primary" variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button> */}
      </Box>
    </Container>
  );
};

export default OrderSummary;
