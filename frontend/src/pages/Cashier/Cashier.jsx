import { useState, useEffect } from "react";
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
  Paper,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrderCashier } from "../../redux/actions/orderAction";
import { useHistory } from "react-router-dom";
import { totalAmount } from "../../utils/utils";
import {
  ORDER_CASHIER_CREATE_RESET,
  ORDER_CASHIER_DETAILS_RESET,
} from "../../redux/constants/orderConstants";
import { uniqueID } from "../../utils/utils";
import { MealGrid } from "../../components";
import { getMealList, updateMealStock } from "../../redux/actions/mealAction";
import { CASHIER_RESET_ITEM } from "../../redux/constants/cashierConstants";
import CashierItem from "./CashierItem";
import { getOrderCashierDetails } from "../../redux/actions/orderAction";
import Receipt from "./Reciept";

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
  const history = useHistory();
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();

  const [paid, setPaid] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderType, setOrderType] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [discount, setDiscount] = useState("");

  const { cashierItems } = useSelector((state) => state.cashier);
  const { success, loading, error, order } = useSelector(
    (state) => state.orderCashierCreate
  );

  const { loading: mealsLoading, meals } = useSelector(
    (state) => state.mealList
  );

  const { order: orderDets } = useSelector(
    (state) => state.orderCashierDetails
  );

  //Subtotal
  const subtotal = cashierItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = totalAmount(cashierItems);

  //total price with vat
  const vat = (subtotalPrice * 12) / 100;
  const total = subtotalPrice + vat;

  //Total amount
  let totalPrice = total;

  // Total Items
  const totalItems = cashierItems.length;

  let discountTotal;

  if (discount) {
    discountTotal = totalPrice * `0.${discount}`;
    totalPrice = total - discountTotal;
  } else {
    discountTotal = 0;
  }

  //handle change
  const change = () => {
    if (paid) {
      return Math.abs(totalPrice - Number(paid));
    } else {
      return 0;
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (paid >= totalPrice.toFixed(2) || paid >= totalPrice) {
      if (totalPrice > 0) {
        setPaymentError(false);
        const orders = {
          id: uniqueID(),
          orderType,
          totalItems: cashierItems.reduce((acc, item) => acc + item.qty, 0),
          subtotal: subtotalPrice,
          discount: discountTotal,
          totalPrice,
          change: change(),
          paymentType,
          paid,
          orderItems: cashierItems,
          vat,
        };

        dispatch(createOrderCashier(orders));
      }
    } else {
      setPaymentError(true);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: CASHIER_RESET_ITEM });
      setIsSave(false);
      setOrderType("");
      //Update meal stock if success
      cashierItems.map((item) =>
        dispatch(updateMealStock(item.meal, item.countInStock - item.qty))
      );
      if (order._id) {
        dispatch({ type: ORDER_CASHIER_CREATE_RESET });
        dispatch(getOrderCashierDetails(order._id));
        setPaid("");
        setPaymentType("");
        setOrderType("");
        setPaymentError(false);
        setDiscount("");
      }
    }

    return () => {
      dispatch({ type: ORDER_CASHIER_CREATE_RESET });
      dispatch({ type: ORDER_CASHIER_DETAILS_RESET });
    };
  }, [success, history, order, dispatch, cashierItems]);

  useState(() => {
    dispatch(getMealList());
  }, []);

  return (
    <>
      {orderDets && <Receipt order={orderDets} />}

      <Modal
        open={isSave}
        onClose={() => setIsSave(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ displayPrint: "none" }}
      >
        <Fade in={isSave}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Payment
            </Typography>

            <Divider sx={{ marginY: 1 }} />

            <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
              <strong>Subtotal: </strong>
              <span>&#8369; {totalAmount(cashierItems).toFixed(2)}</span>
            </Typography>

            <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
              <strong>Discount: </strong>
              <span>{discount || 0}%</span>
            </Typography>

            <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
              <strong>VAT: </strong>
              <span>12%</span>
            </Typography>

            <Divider sx={{ marginY: 1 }} />

            <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
              <strong>Total: </strong>
              <span>&#8369; {totalPrice.toFixed(2)}</span>
            </Typography>

            {paid >= totalPrice && (
              <Typography variant="body" component="p" sx={{ marginTop: 2 }}>
                <strong>Change: </strong>
                <span>&#8369; {change().toFixed(2)}</span>
              </Typography>
            )}

            {error && <Alert severity="error">Failed to save payment</Alert>}

            <Box
              component="form"
              mt={3}
              sx={{
                "& > :not(style)": { my: 1, width: "100%" },
              }}
              /*  onSubmit={handlePayment} */
            >
              <FormControl fullWidth required>
                <InputLabel>Order Type</InputLabel>
                <Select
                  defaultValue={orderType || ""}
                  value={orderType || ""}
                  label="Payment Type"
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <MenuItem value="dine-in">Dine-in</MenuItem>
                  <MenuItem value="delivery">Delivery/Pickup</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Payment Type</InputLabel>
                {orderType === "dine-in" ? (
                  <Select
                    defaultValue={paymentType}
                    value={paymentType}
                    label="Payment Type"
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="credit/debit-card">
                      Credit/Debit-Card
                    </MenuItem>
                  </Select>
                ) : (
                  <Select
                    defaultValue={paymentType}
                    value={paymentType}
                    label="Payment Type"
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <MenuItem value="cod">COD</MenuItem>
                    <MenuItem value="gcash">Gcash</MenuItem>
                    <MenuItem value="credit/debit-card">
                      Credit/Debit-Card
                    </MenuItem>
                  </Select>
                )}
              </FormControl>

              <Box sx={{ display: "flex", gridGap: 3 }}>
                <TextField
                  error={paymentError}
                  helperText={paymentError && "Not enough"}
                  label="Paid"
                  variant="outlined"
                  type="number"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  required
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8369;</InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel>Discount</InputLabel>
                  <Select
                    defaultValue={discount || ""}
                    value={discount || ""}
                    label="discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  >
                    <MenuItem value={15}>Senior Citizen - 15%</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", gridGap: "0.5rem", marginY: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ height: "45px", marginTop: 2 }}
                  color="error"
                  onClick={() => setIsSave(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ height: "45px", marginTop: 2 }}
                  onClick={handlePayment}
                  disabled={loading}
                  color="info"
                >
                  Save payment
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Grid container sx={{ vh: "100%", displayPrint: "none" }}>
        <Grid item lg={8} md={8}>
          {mealsLoading ? (
            "loading..."
          ) : (
            <MealGrid meals={meals} text={"Menu"} />
          )}
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Paper
            sx={{
              height: "80vh",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
            <Box sx={{ overflowY: "auto" }}>
              <Typography variant="h4" sx={{ paddingBottom: 1 }}>
                Items
              </Typography>
              {/*  start */}

              {cashierItems.length === 0 ? (
                <Typography textAlign="center">No item</Typography>
              ) : (
                cashierItems.map((item) => (
                  <CashierItem item={item} key={item.meal} />
                ))
              )}
            </Box>

            <Paper elevation={0} sx={{ paddingTop: 2, paddingX: 1 }}>
              <Divider sx={{ marginBottom: 2 }} />
              <div>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total Item:</Typography>
                  <Typography>{totalItems} </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Subtotal Item: </Typography>
                  <Typography> {subtotal} </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total Price: </Typography>
                  <Typography>
                    &#8369; {totalAmount(cashierItems).toFixed(2)}{" "}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  onClick={() => setIsSave(true)}
                  disabled={cashierItems.length === 0}
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Payment
                </Button>
              </div>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Cashier;
