import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Button,
  /*  FormControlLabel,
  Checkbox, */
  Typography,
  Divider,
  Alert,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { updateUser, getUserDetails } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Loader } from "../../../components";
import { USER_UPDATE_RESET } from "../../../redux/constants/userConstants";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCashier, setIsCashier] = useState(false);
  const [role, setRole] = useState("user");

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.userUpdate);

  const { user, loading: userLoading } = useSelector(
    (state) => state.userDetails
  );

  //Edit submit

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: id, name, email, role, isAdmin, isCashier }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setIsAdmin(user.isAdmin);
      setIsCashier(user.isCashier);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (updateSuccess) {
      history.push("/user-list");
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [history, updateSuccess, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch]);

  if (userLoading) return <Loader />;

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        mt={3}
        sx={{
          "& > :not(style)": { my: 1, width: "100%" },
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4">Edit User</Typography>
        <Divider />

        {updateError && <Alert severity="error">{updateError}</Alert>}

        <TextField
          label="Name"
          variant="outlined"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            defaultValue={role || ""}
            value={role || ""}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            {["User", "Cashier", "Admin"].map((c, index) => (
              <MenuItem key={index} value={c.toLowerCase()}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* 
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin || false}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Is Admin"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isCashier || false}
              onChange={(e) => setIsCashier(e.target.checked)}
            />
          }
          label="Is Cashier"
        /> */}

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
          disabled={updateLoading}
        >
          UPDATE
        </Button>
      </Box>
    </Container>
  );
};

export default Edit;
