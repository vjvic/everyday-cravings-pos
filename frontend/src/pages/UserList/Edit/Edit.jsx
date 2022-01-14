import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Alert,
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

    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (updateSuccess) {
      history.push("/admin/user-list");
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
    <div>
      <Box
        component="form"
        mt={3}
        sx={{
          "& > :not(style)": { my: 1, width: "100%" },
          maxWidth: 900,
          margin: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4">Edit User</Typography>
        <Divider />

        {updateError && <Alert severity="error">{updateError}</Alert>}

        <TextField
          label="Name"
          variant="outlined"
          color="secondary"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          color="secondary"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={isAdmin || false}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Is Admin"
        />

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
    </div>
  );
};

export default Edit;
