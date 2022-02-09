import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { format } from "date-fns";
import { /* useDispatch, */ useSelector } from "react-redux";
/* import { getOrderCashierDetails } from "../../redux/actions/orderAction"; */

const Reciept = ({ order }) => {
  /*   const dispatch = useDispatch(); */

  const { userInfo } = useSelector((state) => state.userLogin);
  /*   const { order } = useSelector((state) => state.orderCashierDetails); */

  /*  const { order } = useSelector((state) => state.orderCashierDetails);

  useEffect(() => {
    dispatch(getOrderCashierDetails(id));
  }, [dispatch, id]); */

  useEffect(() => {
    window.print();
  }, [order]);

  return (
    <Box sx={{ display: "none", displayPrint: "block" }}>
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
          <Typography>ORDER ID: {order && order.id}</Typography>
          <Typography>CASHIER: {userInfo.name.toUpperCase()}</Typography>
        </div>
        <div>
          <Typography>
            {order && format(new Date(order.createdAt), "yyyy/MM/dd")}
          </Typography>
          <Typography>
            {order && format(new Date(order.createdAt), "hh:mm:ss aa")}
          </Typography>
        </div>
      </Box>

      <Divider />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
      >
        <div>
          {order &&
            order.orderItems.map((item) => (
              <Typography key={item._id}>
                <span>{item.qty} </span>
                <span>{item.name.toUpperCase()}</span>
              </Typography>
            ))}
        </div>
        <div>
          {order &&
            order.orderItems.map((item) => (
              <Typography key={item._id}>
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
          <Typography>{"Order Type".toUpperCase()}</Typography>
          <Typography>{"Amount Due".toUpperCase()}</Typography>
          <Typography>{"paid".toUpperCase()}</Typography>
          <Typography>{"change".toUpperCase()}</Typography>
          <Typography>{"Discount".toUpperCase()}</Typography>
          <Typography>{"Vatable sales".toUpperCase()}</Typography>
          <Typography>{"Vat-Exempt sales".toUpperCase()}</Typography>
          <Typography>{"Vat zero-rated sales".toUpperCase()}</Typography>
          <Typography>{"VAT Amount(12%)".toUpperCase()}</Typography>
        </div>
        <div>
          <Typography> {order && order.orderType.toUpperCase()}</Typography>
          <Typography>
            &#8369; {order && order.totalPrice.toFixed(2)}
          </Typography>
          <Typography>&#8369; {order && order.paid.toFixed(2)}</Typography>
          <Typography>&#8369; {order && order.change.toFixed(2)}</Typography>
          <Typography>&#8369; {order && order.discount.toFixed(2)}</Typography>
          <Typography>&#8369; {order && order.subtotal.toFixed(2)}</Typography>
          <Typography>&#8369; 0.00</Typography>
          <Typography>&#8369; 0.00</Typography>
          <Typography>&#8369; {order && order.vat.toFixed(2)}</Typography>
        </div>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: 6 }}>
        <Typography>{"Thanks for visiting".toUpperCase()}</Typography>
        <Typography>{"Everyday Cravings".toUpperCase()}</Typography>
      </Box>
    </Box>
  );
};

export default Reciept;
