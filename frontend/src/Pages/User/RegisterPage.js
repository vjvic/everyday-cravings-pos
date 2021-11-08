import React, { useEffect } from "react";
import { TextField, Container, Button, Typography, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "redux/actions/userActions";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { userInfo, error } = useSelector((state) => state.userRegister);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (data, e) => {
    dispatch(userRegister(data.username, data.email, data.password));

    e.target.reset();
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h4">SIGN UP</Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        component="form"
        sx={{
          "& > :not(style)": { my: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("email")}
          label="Email"
          variant="standard"
          fullWidth
          error={errors?.email?.message.length > 0}
          helperText={errors?.email?.message}
        />

        <TextField
          {...register("username")}
          label="Name"
          variant="standard"
          fullWidth
          error={errors?.username?.message.length > 0}
          helperText={errors?.username?.message}
        />

        <TextField
          {...register("password")}
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          error={errors?.password?.message.length > 0}
          helperText={errors?.password?.message}
        />

        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          variant="standard"
          type="password"
          fullWidth
          error={errors?.confirmPassword?.message.length > 0}
          helperText={errors?.confirmPassword?.message}
        />

        <Button variant="contained" type="submit" sx={{ height: "45px" }}>
          SIGN UP
        </Button>

        <Box>
          <Typography variant="body1">
            Have an account?{" "}
            <Link to={redirect ? `/register?redirect${redirect}` : "/login"}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
