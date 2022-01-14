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
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser, listUsers } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components";

const UserListPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);
  const { success: deleteSuccess } = useSelector((state) => state.userDelete);

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

  //Filter user

  const filterUser = (user) => {
    if (searchTerm !== "") {
      return Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      return user;
    }
  };

  // render/re render user list
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, deleteSuccess]);

  console.log(loading);

  if (loading) return <Loader />;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
          User List
        </Typography>

        <Box mb={2} sx={{ display: "flex", justifyContent: "end" }}>
          <TextField
            label="Search..."
            variant="standard"
            color="secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

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
                  .filter((user) => filterUser(user))
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
                          <IconButton
                            onClick={() =>
                              history.push(`user-list/${row._id}/edit`)
                            }
                          >
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
