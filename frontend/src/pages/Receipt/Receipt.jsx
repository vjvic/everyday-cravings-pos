import React, { useEffect } from "react";
/* import { capitalize } from "@mui/material"; */
import { /* useSelector, */ useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
/* import { getOrderDetails } from "../../redux/actions/orderAction"; */
import styles from "./receipt.module.css";
/* import { format } from "date-fns";
import { Loader } from "../../components"; */

const Receipt = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  /* const { order, loading } = useSelector((state) => state.orderDetails); */

  const handleBack = () => {
    dispatch({ type: ORDER_CREATE_RESET });
    history.push("/admin/cashier");
  };

  const printReceipt = () => {
    window.print();
  };

  useEffect(() => {
    /*  dispatch(getOrderDetails(id)); */
  }, [dispatch, id]);

  /* if (loading) return <Loader />; */

  return (
    <div>
      <div className={styles.container}>
        <table>
          <tr>
            <th>Customer Name</th>
            <th>Payment Type</th>
            <th>Total Amount</th>
            <th>Paid</th>
            <th>Change</th>
            <th>Total Item</th>
            <th>Subtotal</th>
            <th>Date</th>
          </tr>
          {/*  {order && (
            <tr>
              <td>{capitalize(order.customerName)}</td>
              <td>{capitalize(order.paymentType)}</td>
              <td>&#8369; {order.totalAmount.toFixed(2)}</td>
              <td>&#8369; {order.paid.toFixed(2)}</td>
              <td>&#8369; {order.change.toFixed(2)}</td>
              <td>{order.totalItem}</td>
              <td>{order.subTotal}</td>
              <td>{format(new Date(order.date), "P")}</td>
            </tr>
          )} */}
        </table>
      </div>

      <div className={styles.hide}>
        <button onClick={handleBack}>Back to cashier</button>
        <button onClick={printReceipt}>Print receipt</button>
      </div>
    </div>
  );
};

export default Receipt;
