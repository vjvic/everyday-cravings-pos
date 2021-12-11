import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import Layout from "./components/Layout/Layout";
import {
  /*   About,
  Cart, */
  Dashboard,
  /*  Favorites,
  Home, */
  Login,
  MealDetails,
  Meals,
  /*   Orders, */
  Profile,
  Register,
  UserList,
  Results,
  CreateOrder,
  Menu,
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
            {/*   <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/cart/:id?" component={Cart} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <PrivateRoute exact path="/about" component={About} />
  */}
            <PrivateRoute exact path="/meal/:id" component={MealDetails} />
            <PrivateRoute exact path="/results/:keyword" component={Results} />
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* Admin Route */}
            <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
            <AdminRoute exact path="/admin/meals" component={Meals} />
            <AdminRoute exact path="/admin/user-list" component={UserList} />
            <AdminRoute exact path="/admin/menu" component={Menu} />
            <AdminRoute
              exact
              path="/admin/create-order/:id?"
              component={CreateOrder}
            />
            {/* User Auth Route*/}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
