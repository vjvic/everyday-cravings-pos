import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
/* import CashierRoute from "./components/Route/CashierRoute"; */
import Layout from "./components/Layout/Layout";
import {
  Dashboard,
  Login,
  Register,
  MealDetails,
  Meals,
  Profile,
  Menu,
  Receipt,
  SalesReport,
  UserList,
  Category,
  MealEdit,
  UserEdit,
  Cashier,
  Suppliers,
  Ingredient,
  CategoryEdit,
  IngredientEdit,
  SupplierEdit,
  notApproved,
  Cart,
  MyOrders,
  Order,
  OrderList,
  Checkout,
} from "./pages";

const secondary = "#FFECC2";
const primary = "#DE8538";

const theme = createTheme({
  palette: {
    primary: { main: primary, contrastText: "#fff" },
    secondary: {
      main: secondary,
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
    },
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
            {/* global  */}
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute exact path="/menu" component={Menu} />
            <AdminRoute exact path="no-access" component={notApproved} />

            {/* cashier */}
            <PrivateRoute exact path="/cashier/:id?" component={Cashier} />
            <PrivateRoute
              exact
              path="/cashier/receipt/:id"
              component={Receipt}
            />

            {/*  Admin */}
            <AdminRoute exact path="/" component={Dashboard} />
            <AdminRoute
              exact
              path="/suppliers/:id?/edit"
              component={SupplierEdit}
            />
            <AdminRoute
              exact
              path="/user-list/:id?/edit"
              component={UserEdit}
            />
            <AdminRoute
              exact
              path="/ingredients/:id?/edit"
              component={IngredientEdit}
            />
            <AdminRoute
              exact
              path="/categories/:id?/edit"
              component={CategoryEdit}
            />
            <AdminRoute exact path="/categories" component={Category} />
            <AdminRoute path="/meal/:id" component={MealDetails} />
            <AdminRoute exact path="/meals/:id?/edit" component={MealEdit} />
            <AdminRoute exact path="/meals" component={Meals} />
            <AdminRoute exact path="/ingredients" component={Ingredient} />
            <AdminRoute exact path="/suppliers" component={Suppliers} />
            <AdminRoute exact path="/sales-report" component={SalesReport} />
            <AdminRoute exact path="/user-list" component={UserList} />
            <AdminRoute exact path="/order-list" component={OrderList} />

            {/*  user */}
            <PrivateRoute path="/checkout" component={Checkout} />
            <PrivateRoute path="/orders/:id" component={Order} />
            <PrivateRoute exact path="/cart/:id?" component={Cart} />
            <PrivateRoute path="/my-orders" component={MyOrders} />
            <PrivateRoute
              exact
              path="/mealdetails/:id"
              component={MealDetails}
            />

            {/*  Login & Register */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
