import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import Layout from "components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "Pages/User/Home";
import Book from "Pages/User/Book";
import Cart from "Pages/User/Cart";
import Favorites from "Pages/User/Favorites";
import Results from "Pages/User/Results";
import About from "Pages/User/About";
import Dashboard from "Pages/Admin/Dashboard";
import AddMeal from "Pages/Admin/AddMeal";
import Orders from "Pages/Admin/Orders";
import MealDetails from "Pages/User/MealDetails";

const secondary = "#F9F9F9";

const theme = createTheme({
  palette: {
    primary: deepOrange,
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
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/book" component={Book} />
              <Route exact path="/cart/:id?" component={Cart} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/about" component={About} />
              <Route exact path="/results/:query" component={Results} />
              <Route exact path="/meal/:id" component={MealDetails} />

              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/add-meal" component={AddMeal} />
              <Route exact path="/orders" component={Orders} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
