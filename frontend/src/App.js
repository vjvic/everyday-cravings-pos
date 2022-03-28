import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import Layout from "./components/Layout/Layout";
import {
  Dashboard,
  Login,
  Meals,
  Profile,
  Menu,
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
      default: "#F1F5F8",
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

            {/* cashier */}
            <PrivateRoute exact path="/cashier/:id?" component={Cashier} />
            <PrivateRoute exact path="/menu" component={Menu} />

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
            <AdminRoute exact path="/meals/:id?/edit" component={MealEdit} />
            <AdminRoute exact path="/meals" component={Meals} />
            <AdminRoute exact path="/ingredients" component={Ingredient} />
            <AdminRoute exact path="/suppliers" component={Suppliers} />
            <AdminRoute exact path="/sales-report" component={SalesReport} />
            <AdminRoute exact path="/user-list" component={UserList} />

            {/*  Login  */}
            <Route exact path="/login" component={Login} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
