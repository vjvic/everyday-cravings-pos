import React from "react";
import { Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import CartItem from "components/Cart/Item";
import PaymentInfo from "components/Cart/PaymentInfo";
import useFetch from "components/hooks/useFetch";

const Cart = () => {
  const { data: cart, loading } = useFetch("search.php?s= ");

  if (loading) return "";

  const dummyCart = cart.meals.slice(0, 4);

  return (
    <div>
      <Box mb={5}>
        <Typography variant="h3" component="h1">
          Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          {dummyCart.map((item) => (
            <CartItem {...item} key={item.idMeal} />
          ))}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <PaymentInfo />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
