import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
