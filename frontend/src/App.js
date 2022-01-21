import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import Layout from "./components/Layout/Layout";
import {
  Dashboard,
  Login,
  Register,
  MealDetails,
  Meals,
  Profile,
  Results,
  /*  Cashier, */
  Menu,
  /*  Receipt, */
  SalesReport,
  UserList,
  Home,
  Category,
  MealEdit,
  UserEdit,
  Cart,
  Checkout,
  Order,
  MyOrders,
  OrderList,
} from "./pages";

const secondary = "#DE8538";

const theme = createTheme({
  palette: {
    primary: { main: "#FFECC2" },
    secondary: {
      main: secondary,
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
    },
  },
  stepper: {
    iconColor: "green", // or logic to change color
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Layout>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/category/:category" component={Category} />
            <PrivateRoute path="/meal/:id" component={MealDetails} />
            <PrivateRoute path="/results/:keyword" component={Results} />
            <PrivateRoute path="/cart/:id?" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <PrivateRoute path="/orders/:id" component={Order} />
            <PrivateRoute path="/my-orders" component={MyOrders} />
            <PrivateRoute path="/profile" component={Profile} />
            <AdminRoute path="/admin/dashboard" component={Dashboard} />
            <AdminRoute exact path="/admin/meals" component={Meals} />
            <AdminRoute
              exact
              path="/admin/meals/:id?/edit"
              component={MealEdit}
            />
            <AdminRoute path="/admin/menu" component={Menu} />
            <AdminRoute exact path="/admin/user-list" component={UserList} />
            <AdminRoute path="/admin/order-list" component={OrderList} />
            <AdminRoute path="/admin/user-list/:id/edit" component={UserEdit} />
            {/*   <PrivateRoute path="/admin/cashier/:id?" component={Cashier} /> */}
            {/*     <PrivateRoute path="/admin/receipt/:id" component={Receipt} /> */}
            <AdminRoute path="/admin/sales-report" component={SalesReport} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
