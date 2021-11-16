import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/* import { deepOrange } from "@mui/material/colors"; */
import Layout from "components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookPage from "Pages/User/BookPage";
import HomePage from "Pages/User/HomePage";
import CartPage from "Pages/User/CartPage";
import FavoritesPage from "Pages/User/FavoritesPage";
import ResultsPage from "Pages/User/ResultsPage";
import AboutPage from "Pages/User/AboutPage";
import Dashboard from "Pages/Admin/Dashboard";
import AddMeal from "Pages/Admin/AddMeal";
import Orders from "Pages/Admin/Orders";
import MealDetailsPage from "Pages/User/MealDetailsPage";
import LoginPage from "Pages/User/LoginPage";
import RegisterPage from "Pages/User/RegisterPage";
import PrivateRoute from "components/Route/PrivateRoute";
import AdminRoute from "components/Route/AdminRoute";

const secondary = "#F9F9F9";

const theme = createTheme({
  palette: {
    primary: { main: "#FFECC2" },
    secondary: {
      main: secondary,
    },
    background: {
      default: secondary,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Layout>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/cart/:id?" component={CartPage} />
              <PrivateRoute exact path="/favorites" component={FavoritesPage} />
              <PrivateRoute exact path="/about" component={AboutPage} />
              <PrivateRoute
                exact
                path="/results/:query"
                component={ResultsPage}
              />
              <PrivateRoute
                exact
                path="/meal/:id"
                component={MealDetailsPage}
              />
              <PrivateRoute exact path="/book" component={BookPage} />

              <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
              <AdminRoute exact path="/admin/add-meal" component={AddMeal} />
              <AdminRoute exact path="/admin/orders" component={Orders} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
