import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import { useSelector } from "react-redux";
import { totalAmount } from "../../utils/utils";

const OrderSummary = ({ activeStep, handleBack, handleNext, steps }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalCart = cartItems.length;
  const totalItems = totalAmount(cartItems);
  //static shipping value
  const shipping = 80;
  const total = totalItems + shipping;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1 }}>
              SHIPPING
            </Typography>
            <Typography variant="body1">
              Address: 0898 Sulok st. Malolos Bulacan 3000
            </Typography>
          </Box>
          <Divider />
          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1 }}>
              PAYMENT METHOD
            </Typography>
            <Typography variant="body1">Method: Cash on Delivery</Typography>
          </Box>
          <Divider />

          <Box my={2}>
            <Typography variant="h4" sx={{ paddingY: 1, marginBottom: 3 }}>
              ORDER ITEMS
            </Typography>

            {/* <Grid container spacing={2}> */}
            {cartItems.map((item, i) => (
              <>
                <Grid container key={item.meal} sx={{ paddingY: 1 }}>
                  <Grid item xs={3} lg={3}>
                    <img
                      style={{ width: "50px" }}
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
              </>
            ))}
            {/*   </Grid> */}
          </Box>
        </Grid>

        <Grid item lg={4} sx={{ marginY: 2 }}>
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
            <Divider />
            <Box p={2}>
              <Button variant="contained" fullWidth>
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        {/*   <Button color="primary" variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button> */}
      </Box>
    </Container>
  );
};

export default OrderSummary;
