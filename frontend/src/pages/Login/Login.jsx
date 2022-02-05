import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email.toLowerCase(), password));

    setEmail("");
    setPassword("");
  };

  return (
    <Grid container alignItems="center" sx={{ height: "calc(100vh - 350px)" }}>
      <Grid item lg={6}>
        <Box>
          <img src="/images/login.svg" alt="register svg" width="80%" />
        </Box>
      </Grid>
      <Grid item lg={6}>
        <Box sx={{ maxWidth: "600px", margin: "auto" }}>
          <Box my={1}>
            <Typography variant="body">SIGN IN</Typography>
          </Box>

          <Box mb={5}>
            <Typography variant="h4">Everyday Cravings!</Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              fullWidth
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <Button variant="contained" type="submit" sx={{ height: "45px" }}>
              SIGN IN
            </Button>

            {/*  <Box>
              <Typography variant="body1">
                Don't have an account? <Link to={"/register"}>Register</Link>
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
