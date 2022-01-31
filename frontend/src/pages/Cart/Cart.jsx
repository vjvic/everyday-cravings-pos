import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Alert,
  /*  Card,
  CardContent, */
  Button,
  Divider,
  Modal,
  TextField,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Paper,
} from "@mui/material";
import { useParams, useLocation /* useHistory  */ } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { Link } from "react-router-dom";
import Item from "./Item/Item";
import { createOrderCashier } from "../../redux/actions/orderAction";
import { updateMealStock } from "../../redux/actions/mealAction";
import { useHistory } from "react-router-dom";
import { totalAmount } from "../../utils/utils";
import { ORDER_CASHIER_CREATE_RESET } from "../../redux/constants/orderConstants";
import { BsFillBagCheckFill } from "react-icons/bs";
import { uniqueID } from "../../utils/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();

  /*  const [customerName, setCustomerName] = useState("");
  const [paid, setPaid] = useState("");
  const [paymentType, setPaymentType] = useState(""); */
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState("");

  //Item quantity
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);
  const { success, loading, error, order } = useSelector(
    (state) => state.orderCashierCreate
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  //Total amount
  let totalPrice = totalAmount(cartItems);

  // Total Items
  const totalItems = cartItems.length;

  //Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty, 0);

  let discount = 0;

  if (orderType === "foodpanda") {
    discount = totalPrice * 0.15;
    totalPrice = totalAmount(cartItems) - discount;
  } else {
    discount = 0;
  }

  //change
  /*  const change = Math.abs(totalAmount - Number(paid)); */

  const handlePayment = (e) => {
    e.preventDefault();

    const orders = {
      id: uniqueID(),
      name,
      orderType,
      totalItems,
      subtotal,
      discount,
      totalPrice,
    };

    dispatch(createOrderCashier(orders));

    cartItems.map((item) =>
      dispatch(updateMealStock(item.meal, item.countInStock - item.qty))
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  useEffect(() => {
    if (success) {
      setIsSave(false);
      setName("");
      setOrderType("");
      if (order._id) {
        history.push(`/cashier/receipt/${order._id}`);
        dispatch({ type: ORDER_CASHIER_CREATE_RESET });
      }
    }
  }, [success, history, order, dispatch]);

  const noCart = (
    <Alert severity="info">
      No item{" "}
      <Typography variant="body2" color="inherit" component={Link} to="/menu">
        Go to Menu
      </Typography>
    </Alert>
  );

  const cartItemsList = (
    <>
      {cartItems.map((item) => (
        <Item item={item} key={item.meal} />
      ))}
    </>
  );

  return (
    <Container>
      <Modal
        open={isSave}
        onClose={() => setIsSave(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isSave}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Payment
            </Typography>

            <Typography variant="body" component="p" sx={{ marginTop: 2 }}>
              <strong>Total Price: </strong>
              <span>&#8369; {totalPrice.toFixed(2)}</span>
            </Typography>

            {orderType === "foodpanda" && (
              <Typography variant="body" component="p" sx={{ marginTop: 2 }}>
                <strong>Discount: </strong>
                <span>15%</span>
              </Typography>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              mt={3}
              sx={{
                "& > :not(style)": { my: 1, width: "100%" },
              }}
              /*  onSubmit={handlePayment} */
            >
              <TextField
                label="Customer Name"
                variant="outlined"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Order Type</InputLabel>
                <Select
                  defaultValue={orderType || ""}
                  value={orderType || ""}
                  label="Payment Type"
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <MenuItem value="dine-in">Dine-in</MenuItem>
                  <MenuItem value="foodpanda">Food Panda</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ height: "45px" }}
                onClick={handlePayment}
                disabled={loading}
              >
                Save payment
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <div>
        <Box mb={5}>
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
            Cashier
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={3}>
          <Grid item sm={12} md={7} lg={7}>
            {cartItems <= 0 ? noCart : cartItemsList}
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper variant="outlined" sx={{ padding: 2 }}>
              {/*  <CardContent> */}
              <Typography variant="h4" component="h3" sx={{ paddingBottom: 2 }}>
                Total ({totalItems}) Items
              </Typography>

              <Typography variant="h4" component="h3" sx={{ paddingBottom: 2 }}>
                Subtotal ({subtotal}) Items
              </Typography>

              <Typography variant="body1">
                &#8369;
                {totalAmount(cartItems).toFixed(2)}
              </Typography>

              <Divider />

              {/*   <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ marginTop: 3 }}
                disabled={cartItems.length === 0}
                onClick={() => history.push("/checkout")}
              >
                Proceed To Checkout
              </Button> */}

              {userInfo && (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ marginTop: 3 }}
                  disabled={cartItems.length === 0 || userInfo.role === "user"}
                  onClick={() => setIsSave(true)}
                  startIcon={<BsFillBagCheckFill />}
                >
                  Checkout
                </Button>
              )}
              {/*  </CardContent> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Cart;
