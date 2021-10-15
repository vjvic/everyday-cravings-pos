import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import Layout from "components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "Pages/Home";

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
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
