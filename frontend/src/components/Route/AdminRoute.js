import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo && userInfo.isAdmin ? (
          <Component {...props} />
        ) : !userInfo ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/admin/dashboard" />
        );
      }}
    ></Route>
  );
};

export default AdminRoute;
