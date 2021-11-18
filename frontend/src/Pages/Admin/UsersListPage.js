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
} from "@mui/material";
import { Box } from "@mui/system";
import { listUsers } from "redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser } from "redux/actions/userActions";

const UserListPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, deleteSuccess]);

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
        <CircularProgress />
      </Box>
    );

  return (
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
                        <IconButton>
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
  );
};

export default UserListPage;
