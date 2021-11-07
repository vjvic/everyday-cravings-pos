import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Button,
  Input,
  InputLabel,
  IconButton,
  FormControl,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/actions/userActions";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const { userInfo, error } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Handle passowrd change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //Toggle password visibility
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, values.password);
    dispatch(login(email, values.password));

    setEmail("");
    setValues({ password: "" });
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h4">SIGN IN</Typography>
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
          variant="standard"
          fullWidth
        />

        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant="contained" type="submit" sx={{ height: "45px" }}>
          SIGN IN
        </Button>

        <Box>
          <Typography variant="body1">
            New Customer?{" "}
            <Link to={redirect ? `/register?redirect${redirect}` : "/register"}>
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
