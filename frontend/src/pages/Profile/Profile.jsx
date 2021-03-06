import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";
import { Loader } from "../../components";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();

  const {
    user,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.userDetails);

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorPassword("password must match");
    } else {
      dispatch(updateUserProfile({ id: user._id, email, name, password }));
    }
  };

  if (loadingDetails || loadingUpdate) return <Loader />;

  return (
    <div>
      <Paper
        elevation={0}
        sx={{ maxWidth: "600px", margin: "auto", padding: 2 }}
      >
        <Box>
          <Typography variant="h4">Profile</Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {errorDetails && <Alert severity="error">Failed to fetch data</Alert>}
        {errorUpdate && (
          <Alert severity="error">Failed to update profile</Alert>
        )}
        {successUpdate && <Alert severity="success">Update Success</Alert>}

        <Box
          component="form"
          sx={{
            "& > :not(style)": { my: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleUpdate}
        >
          <TextField
            value={email || ""}
            label="Email"
            fullWidth
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#888" },
            }}
          />

          <TextField
            value={name || ""}
            label="Name"
            fullWidth
            variant="filled"
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              style: { color: "#888" },
            }}
          />

          <TextField
            value={password}
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#888" },
            }}
          />

          <TextField
            value={confirmPassword}
            label="Confirm Password"
            type="password"
            fullWidth
            variant="filled"
            error={errorPassword.length > 0}
            helperText={errorPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#888" },
            }}
          />

          <Button variant="contained" type="submit" sx={{ height: "45px" }}>
            UPDATE
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default ProfilePage;
