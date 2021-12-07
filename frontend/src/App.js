import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/* import { deepOrange } from "@mui/material/colors"; */
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AboutPage,
  BookPage,
  CartPage,
  DashboardPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  MealDetailsPage,
  MealsPage,
  OrdersPage,
  ProfilePage,
  RegisterPage,
  UserListPage,
  ResultsPage,
} from "./pages";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";

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
            {/* Users Route */}
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/cart/:id?" component={CartPage} />
            <PrivateRoute exact path="/favorites" component={FavoritesPage} />
            <PrivateRoute exact path="/about" component={AboutPage} />
            <PrivateRoute
              exact
              path="/results/:keyword"
              component={ResultsPage}
            />
            <PrivateRoute exact path="/meal/:id" component={MealDetailsPage} />
            <PrivateRoute exact path="/book" component={BookPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            {/* Admin Route */}
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={DashboardPage}
            />
            <AdminRoute exact path="/admin/meals" component={MealsPage} />
            <AdminRoute exact path="/admin/orders" component={OrdersPage} />
            <AdminRoute
              exact
              path="/admin/user-list"
              component={UserListPage}
            />
            {/* User Auth Route*/}
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
