import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Alert,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import CartItem from "components/Cart/Item";
import { useParams, useLocation /* useHistory  */ } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "redux/actions/cartAction";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { id } = useParams();
  const location = useLocation();
  /*   const history = useHistory(); */

  const dispatch = useDispatch();

  //Item quantity
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const noCart = (
    <Alert severity="info">
      Your cart is empty{" "}
      <Typography variant="body2" color="inherit" component={Link} to="/">
        Back to Home
      </Typography>
    </Alert>
  );

  const cartItemsList = (
    <>
      {cartItems.map((item) => (
        <CartItem item={item} key={item.meal} />
      ))}
    </>
  );

  return (
    <div>
      <Box mb={5}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
          Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item sm={12} md={7} lg={7}>
          {cartItems <= 0 ? noCart : cartItemsList}
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h3" sx={{ paddingBottom: 2 }}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </Typography>

              <Typography variant="body1">
                &#8369;
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Typography>

              <Divider />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ marginTop: 3 }}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartPage;
