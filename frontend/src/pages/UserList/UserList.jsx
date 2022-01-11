import React, { useState, useEffect } from "react";
import {
  Paper,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Typography,
  TableHead,
  CircularProgress,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser, listUsers } from "../../redux/actions/userActions";
import { updateUser, getUserDetails } from "../../redux/actions/userActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const UserListPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);
  const { user, loading: userLoading } = useSelector(
    (state) => state.userDetails
  );
  const { success: deleteSuccess } = useSelector((state) => state.userDelete);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.userUpdate);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  //Edit user
  const handleEdit = (id) => {
    setIsModal(true);
    dispatch(getUserDetails(id));
  };

  //Edit submit

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));

    setIsModal(false);
  };

  // render/re render user list
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, deleteSuccess, updateSuccess, user]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      <Modal
        open={isModal}
        onClose={() => setIsModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModal}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Edit User
            </Typography>

            {updateError && <Alert severity="error">{updateError}</Alert>}

            {userLoading ? (
              "loading..."
            ) : (
              <Box
                component="form"
                mt={3}
                sx={{
                  "& > :not(style)": { my: 1, width: "100%" },
                }}
                onSubmit={handleSubmit}
              >
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
            )}
          </Box>
        </Fade>
      </Modal>

      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
          User List
        </Typography>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {["ID", "Email", "Name", "Admin"].map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover key={row._id}>
                        <TableCell></TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          {row.isAdmin ? <CheckIcon /> : <CloseIcon />}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(row._id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default UserListPage;
