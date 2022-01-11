import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/Route/PrivateRoute";
import Layout from "./components/Layout/Layout";
import {
  Dashboard,
  Login,
  Register,
  MealDetails,
  Meals,
  Profile,
  Results,
  Cashier,
  Menu,
  Receipt,
  SalesReport,
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
            <PrivateRoute exact path="/meal/:id" component={MealDetails} />
            <PrivateRoute exact path="/results/:keyword" component={Results} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/admin/meals" component={Meals} />
            <PrivateRoute exact path="/admin/menu" component={Menu} />
            <PrivateRoute
              exact
              path="/admin/cashier/:id?"
              component={Cashier}
            />
            <PrivateRoute exact path="/admin/receipt/:id" component={Receipt} />
            <PrivateRoute
              exact
              path="/admin/sales-report"
              component={SalesReport}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
