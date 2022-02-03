import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Alert,
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
import { useParams, useLocation } from "react-router";
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

const Cashier = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();

  const [paid, setPaid] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState("");
  const [paymentError, setPaymentError] = useState(false);

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
  const change = () => {
    if (paid) {
      return Math.abs(totalPrice - Number(paid));
    } else {
      return 0;
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (paid < totalPrice) {
      setPaymentError(true);
    } else {
      setPaymentError(false);
      const orders = {
        id: uniqueID(),
        name,
        orderType,
        totalItems,
        subtotal,
        discount,
        totalPrice,
        change: change(),
        paymentType,
        paid,
        orderItems: cartItems,
      };

      dispatch(createOrderCashier(orders));

      cartItems.map((item) =>
        dispatch(updateMealStock(item.meal, item.countInStock - item.qty))
      );
    }
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

            {paid > totalPrice && (
              <Typography variant="body" component="p" sx={{ marginTop: 2 }}>
                <strong>Change: </strong>
                <span>&#8369; {change().toFixed(2)}</span>
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
                required
              />

              <FormControl fullWidth required>
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

              <FormControl fullWidth required>
                <InputLabel>Payment Type</InputLabel>
                <Select
                  defaultValue={paymentType || ""}
                  value={paymentType || ""}
                  label="Payment Type"
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="credit">Credit</MenuItem>
                </Select>
              </FormControl>

              <TextField
                error={paymentError}
                helperText={paymentError && "Not enough"}
                label="Paid"
                variant="outlined"
                type="number"
                value={paid || ""}
                onChange={(e) => setPaid(e.target.value)}
                required
              />

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
                  Payment
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

export default Cashier;
