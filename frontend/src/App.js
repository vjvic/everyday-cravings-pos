import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import CashierRoute from "./components/Route/CashierRoute";
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
            <AdminRoute exact path="/categories" component={Category} />
            <AdminRoute
              exact
              path="/categories/:id?/edit"
              component={CategoryEdit}
            />
            <AdminRoute path="/meal/:id" component={MealDetails} />
            <PrivateRoute path="/profile" component={Profile} />
            <AdminRoute exact path="/" component={Dashboard} />
            <AdminRoute exact path="/meals" component={Meals} />
            <AdminRoute exact path="/ingredients" component={Ingredient} />
            <AdminRoute
              exact
              path="/ingredients/:id?/edit"
              component={IngredientEdit}
            />
            <AdminRoute exact path="/meals/:id?/edit" component={MealEdit} />
            <PrivateRoute exact path="/menu" component={Menu} />
            <AdminRoute exact path="/user-list" component={UserList} />
            <AdminRoute
              exact
              path="/user-list/:id?/edit"
              component={UserEdit}
            />
            <AdminRoute exact path="/suppliers" component={Suppliers} />
            <AdminRoute
              exact
              path="/suppliers/:id?/edit"
              component={SupplierEdit}
            />
            <AdminRoute exact path="/sales-report" component={SalesReport} />

            <PrivateRoute exact path="/cashier/:id?" component={Cashier} />
            <PrivateRoute
              exact
              path="/cashier/receipt/:id"
              component={Receipt}
            />

            <AdminRoute exact path="no-access" component={notApproved} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
