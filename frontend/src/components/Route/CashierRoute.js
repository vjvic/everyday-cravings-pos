import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const CashierRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo && userInfo.role === "cashier" ? (
          <Redirect to="/cashier" />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default CashierRoute;
