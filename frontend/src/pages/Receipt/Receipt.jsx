import React, { useEffect } from "react";
import { capitalize, Container, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
/* import { ORDER_CASHIER_CREATE_RESET } from "../../redux/constants/orderConstants"; */
import { getOrderCashierDetails } from "../../redux/actions/orderAction";
import styles from "./receipt.module.css";
import { format } from "date-fns";
import { Loader } from "../../components";

const Receipt = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { order, loading } = useSelector((state) => state.orderCashierDetails);

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
    <Container maxWidth="md">
      <div className={styles.container}>
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
      </div>

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
