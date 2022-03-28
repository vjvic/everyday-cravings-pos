import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  updateUser,
  getUserDetails,
  userRegister,
} from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Loader } from "../../../components";
import {
  USER_UPDATE_RESET,
  USER_CREATE_RESET,
} from "../../../redux/constants/userConstants";
import { uniqueID } from "../../../utils/utils";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCashier, setIsCashier] = useState(false);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  let isEdit = id ? true : false;

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.userUpdate);

  const { user, loading: userLoading } = useSelector(
    (state) => state.userDetails
  );

  const { success, error } = useSelector((state) => state.userRegister);

  //Edit submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      if (password === confirmPassword) {
        setPasswordError(false);
        dispatch(
          updateUser({
            _id: id,
            name,
            email,
            role,
            isAdmin,
            isCashier,
            password,
          })
        );
      } else {
        setPasswordError(true);
      }
    } else {
      //create user
      if (password === confirmPassword) {
        setPasswordError(false);
        const id = uniqueID();
        dispatch(userRegister(name, email, password, id, role));
      } else {
        setPasswordError(true);
      }
    }
  };

  useEffect(() => {
    if (isEdit && user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setIsAdmin(user.isAdmin);
      setIsCashier(user.isCashier);
    }
  }, [dispatch, user, isEdit]);

  useEffect(() => {
    if (isEdit && updateSuccess) {
      history.push("/user-list");
    }

    return () => {
      dispatch({ type: USER_UPDATE_RESET });
    };
  }, [history, updateSuccess, dispatch, isEdit]);

  useEffect(() => {
    if (success) {
      history.push("/user-list");
    }

    return () => {
      dispatch({ type: USER_CREATE_RESET });
    };
  }, [success, history, dispatch]);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch, isEdit]);

  if (userLoading) return <Loader />;

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        component="form"
        sx={{
          "& > :not(style)": { my: 1, width: "100%" },
          padding: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4">
          {" "}
          {isEdit ? "Edit User" : "Add User"}
        </Typography>
        <Divider />
        {updateError && <Alert severity="error">{updateError}</Alert>}
        {error && <Alert severity="error">Failed to create user</Alert>}

        <TextField
          label="Name"
          variant="outlined"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          value={password || ""}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required={!isEdit}
        />

        <TextField
          label="Confirm password"
          variant="outlined"
          value={confirmPassword || ""}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError && "password must match"}
          required={!isEdit}
        />

        <FormControl fullWidth required>
          <InputLabel>Role</InputLabel>
          <Select
            defaultValue={role || ""}
            value={role || ""}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            {["Admin", "Cashier"].map((c, index) => (
              <MenuItem key={index} value={c.toLowerCase()}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
          disabled={updateLoading}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Edit;
