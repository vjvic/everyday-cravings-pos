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
  Receipt,
  SalesReport,
  UserList,
  /* Home, */
  Category,
  MealEdit,
  UserEdit,
  Cart,
  Checkout,
  Order,
  MyOrders,
  OrderList,
  Suppliers,
  Ingredient,
  CategoryEdit,
  IngredientEdit,
  SupplierEdit,
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
            {/* <Route exact path="/" component={Home} /> */}
            <PrivateRoute exact path="/categories" component={Category} />
            <PrivateRoute
              exact
              path="/categories/:id?/edit"
              component={CategoryEdit}
            />
            <Route path="/meal/:id" component={MealDetails} />
            <PrivateRoute path="/results/:keyword" component={Results} />
            <Route exact path="/cashier/:id?" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <PrivateRoute path="/orders/:id" component={Order} />
            <Route path="/my-orders" component={MyOrders} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/cashier/receipt/:id"
              component={Receipt}
            />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/meals" component={Meals} />
            <PrivateRoute exact path="/ingredients" component={Ingredient} />
            <PrivateRoute
              exact
              path="/ingredients/:id?/edit"
              component={IngredientEdit}
            />
            <PrivateRoute exact path="/meals/:id?/edit" component={MealEdit} />
            <PrivateRoute exact path="/menu" component={Menu} />
            <PrivateRoute exact path="/user-list" component={UserList} />
            <PrivateRoute exact path="/order-list" component={OrderList} />
            <PrivateRoute
              exact
              path="/user-list/:id/edit"
              component={UserEdit}
            />
            {/*   <PrivateRoute path="/cashier/:id?" component={Cashier} /> */}
            <PrivateRoute exact path="/suppliers" component={Suppliers} />
            <PrivateRoute
              exact
              path="/suppliers/:id?/edit"
              component={SupplierEdit}
            />
            <PrivateRoute exact path="/sales-report" component={SalesReport} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
