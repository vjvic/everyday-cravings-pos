import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Alert,
  Card,
  CardContent,
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
} from "@mui/material";
import { useParams, useLocation /* useHistory  */ } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { Link } from "react-router-dom";
import Item from "./Item";
/* import { createOrder } from "../../redux/actions/orderAction"; */
import { useHistory } from "react-router-dom";

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

  const [customerName, setCustomerName] = useState("");
  const [paid, setPaid] = useState("");
  const [paymentType, setPaymentType] = useState("");

  //Item quantity
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);
  const { success, loading, error, order } = useSelector(
    (state) => state.orderCreate
  );

  //Total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  // Total Items
  const totalItem = cartItems.length;

  //Subtotal
  const subTotal = cartItems.reduce((acc, item) => acc + item.qty, 0);

  //change
  const change = Math.abs(totalAmount - Number(paid));

  /*   const handlePayment = (e) => {
    e.preventDefault();

    const orders = {
      totalItem,
      subTotal,
      customerName: customerName.toLowerCase(),
      paid: Number(paid),
      change: change,
      totalAmount,
      paymentType,
      date: new Date(),
    };

    if (customerName && paid >= totalAmount && paymentType) {
      dispatch(createOrder(orders));
    }
  }; */

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  useEffect(() => {
    if (success) {
      setIsSave(false);
      setCustomerName("");
      setPaid("");
      setPaymentType("");
      if (order._id) {
        history.push(`/admin/receipt/${order._id}`);
      }
    }
  }, [success, history, order]);

  const noCart = (
    <Alert severity="info">
      No item{" "}
      <Typography variant="body2" color="inherit" component={Link} to="/">
        Go to Home
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
    <>
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
              <strong>Total Amount: </strong>
              <span>&#8369; {totalAmount.toFixed(2)}</span>
            </Typography>
            {Number(paid) >= totalAmount && (
              <Typography variant="body" omponent="p">
                <strong>Total Change: </strong>
                <span>&#8369; {change.toFixed(2)}</span>
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
                color="secondary"
                value={customerName || ""}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <TextField
                label="Paid"
                type="number"
                variant="outlined"
                color="secondary"
                value={paid || ""}
                onChange={(e) => setPaid(e.target.value)}
              />

              <FormControl fullWidth color="secondary">
                <InputLabel>Payment Type</InputLabel>
                <Select
                  defaultValue={paymentType || ""}
                  value={paymentType || ""}
                  label="Payment Type"
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="credit-card">Credit Card</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ height: "45px" }}
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
            Cart Items
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={3}>
          <Grid item sm={12} md={7} lg={7}>
            {cartItems <= 0 ? noCart : cartItemsList}
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Card>
              <CardContent>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ paddingBottom: 2 }}
                >
                  Total ({totalItem}) Items
                </Typography>

                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ paddingBottom: 2 }}
                >
                  Subtotal ({subTotal}) Items
                </Typography>

                <Typography variant="body1">
                  &#8369;
                  {totalAmount.toFixed(2)}
                </Typography>

                <Divider />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ marginTop: 3 }}
                  disabled={cartItems.length === 0}
                  /* onClick={() => setIsSave(true)} */
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Cart;
