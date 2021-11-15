import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/* import { deepOrange } from "@mui/material/colors"; */
import Layout from "components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* import HomePage from "Pages/User/HomePage";
import BookPage from "Pages/User/BookPage";
import CartPage from "Pages/User/CartPage";
import FavoritesPage from "Pages/User/FavoritesPage";
import ResultsPage from "Pages/User/ResultsPage";
import AboutPage from "Pages/User/AboutPage"; */
import Dashboard from "Pages/Admin/Dashboard";
import AddMeal from "Pages/Admin/AddMeal";
import Orders from "Pages/Admin/Orders";
/* import MealDetailsPage from "Pages/User/MealDetailsPage"; */
import LoginPage from "Pages/User/LoginPage";
import RegisterPage from "Pages/User/RegisterPage";
import PrivateRoute from "components/PrivareRoute/PrivateRoute";

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
              {/* <Route exact path="/" component={HomePage} />
              <Route exact path="/book" component={BookPage} />
              <Route exact path="/cart/:id?" component={CartPage} />
              <Route exact path="/favorites" component={FavoritesPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/results/:query" component={ResultsPage} />
              <Route exact path="/meal/:id" component={MealDetailsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} /> */}
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/add-meal" component={AddMeal} />
              <PrivateRoute exact path="/orders" component={Orders} />
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
