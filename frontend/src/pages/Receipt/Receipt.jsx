import React, { useEffect } from "react";
import { Container, Button, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
/* import { ORDER_CASHIER_CREATE_RESET } from "../../redux/constants/orderConstants"; */
import { getOrderCashierDetails } from "../../redux/actions/orderAction";
import styles from "./receipt.module.css";
import { format } from "date-fns";
import { Loader } from "../../components";
import { Box } from "@mui/system";

const Receipt = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { order, loading } = useSelector((state) => state.orderCashierDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleBack = () => {
    /* dispatch({ type: ORDER_CREATE_RESET }); */
    history.push("/cashier");
  };

  const printReceipt = () => {
    window.print();
  };

  useEffect(() => {
    dispatch(getOrderCashierDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <Container maxWidth="xs">
      {/*  <div className={styles.container}>
        <table>
          <tr>
            <th>Customer Name</th>
            <th>Order Type</th>
            <th>Total Items</th>
            <th>Subtotal</th>
            <th>Discount</th>
            <th>total Price</th>
            <th>Date</th>
          </tr>
          {order && (
            <tr>
              <td>{capitalize(order.name)}</td>
              <td>{capitalize(order.orderType)}</td>
              <td>{order.totalItems}</td>
              <td>{order.subtotal}</td>
              <td>&#8369; {order.discount.toFixed(2)}</td>
              <td>&#8369; {order.totalPrice.toFixed(2)}</td>
              <td>{format(new Date(order.createdAt), "yyyy-MM-dd")}</td>
            </tr>
          )}
        </table>
      </div> */}

      <Box sx={{ textAlign: "center", marginBottom: 6 }}>
        <Typography>{"Everyday Cravings".toUpperCase()}</Typography>
        <Typography>{"Desta Malolos Bulacan".toUpperCase()}</Typography>
        <Typography>999-888-888</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <div>
          <Typography>ORDER ID: {order.id}</Typography>
          <Typography>HOST: {userInfo.name.toUpperCase()}</Typography>
        </div>
        <div>
          <Typography>
            {format(new Date(order.createdAt), "yyyy/MM/dd")}
          </Typography>
          <Typography>
            {format(new Date(order.createdAt), "hh:mm:ss aa")}
          </Typography>
        </div>
      </Box>

      <Divider />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
      >
        <div>
          {order.orderItems.map((item) => (
            <Typography>
              <span>{item.qty} </span>
              <span>{item.name.toUpperCase()}</span>
            </Typography>
          ))}
        </div>
        <div>
          {order.orderItems.map((item) => (
            <Typography>
              &#8369; <span>{(item.qty * item.price).toFixed(2)} </span>
            </Typography>
          ))}
        </div>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: 2,
          marginBottom: 10,
        }}
      >
        <div>
          <Typography>{"Subtotal".toUpperCase()}</Typography>
          <Typography>{"Discount".toUpperCase()}</Typography>
          <Typography>{"Total".toUpperCase()}</Typography>
        </div>
        <div>
          <Typography>
            &#8369; {(order.totalPrice + order.discount).toFixed(2)}
          </Typography>
          <Typography>&#8369; {order.discount.toFixed(2)}</Typography>
          <Typography>&#8369; {order.totalPrice.toFixed(2)}</Typography>
        </div>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: 6 }}>
        <Typography>{"Thanks for visiting".toUpperCase()}</Typography>
        <Typography>{"Everyday Cravings".toUpperCase()}</Typography>
      </Box>

      <div className={styles.hide}>
        <Button color="inherit" onClick={handleBack}>
          Back to cashier
        </Button>
        <Button variant="outlined" onClick={printReceipt}>
          Print receipt
        </Button>
      </div>
    </Container>
  );
};

export default Receipt;
