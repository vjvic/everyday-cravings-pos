import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/* import { deepOrange } from "@mui/material/colors"; */
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookPage from "./Pages/User/BookPage";
import HomePage from "./Pages/User/HomePage";
import CartPage from "./Pages/User/CartPage";
import FavoritesPage from "./Pages/User/FavoritesPage";
import ResultsPage from "./Pages/User/ResultsPage";
import AboutPage from "./Pages/User/AboutPage";
import Dashboard from "./Pages/Admin/DashboardPage";
import MealsPage from "./Pages/Admin/MealsPage";
import Orders from "./Pages/Admin/OrdersPage";
import MealDetailsPage from "./Pages/User/MealDetailsPage";
import LoginPage from "./Pages/User/LoginPage";
import RegisterPage from "./Pages/User/RegisterPage";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import UsersListPage from "./Pages/Admin/UsersListPage";
import CssBaseline from "@mui/material/CssBaseline";

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
              path="/results/:query"
              component={ResultsPage}
            />
            <PrivateRoute exact path="/meal/:id" component={MealDetailsPage} />
            <PrivateRoute exact path="/book" component={BookPage} />
            {/* Admin Route */}
            <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
            <AdminRoute exact path="/admin/meals" component={MealsPage} />
            <AdminRoute exact path="/admin/orders" component={Orders} />
            <AdminRoute
              exact
              path="/admin/user-list"
              component={UsersListPage}
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
