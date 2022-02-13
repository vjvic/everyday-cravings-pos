import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo && userInfo.role === "admin" ? (
          <Component {...props} />
        ) : userInfo && userInfo.role === "user" ? (
          <Redirect to="/menu" />
        ) : userInfo && userInfo.role === "cashier" ? (
          <Redirect to="/cashier" />
        ) : !userInfo ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
};

export default AdminRoute;
