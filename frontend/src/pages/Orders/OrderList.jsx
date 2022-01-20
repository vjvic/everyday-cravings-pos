import React, { useState, useEffect } from "react";
import {
  Paper,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  TableHead,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";

const MyOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.orderList);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterOrders = (order) => {
    if (searchTerm !== "") {
      return Object.values(order)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      return order;
    }
  };

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
          Orders
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
                  {["ID", "User", "Date", "Total", "Paid", "Delivered"].map(
                    (headCell) => (
                      <TableCell key={headCell}>{headCell}</TableCell>
                    )
                  )}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders
                  .filter((order) => filterOrders(order))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover key={row._id}>
                        <TableCell></TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell>{row.user.name}</TableCell>
                        <TableCell>
                          {format(new Date(row.createdAt), "yyyy-MM-dd")}
                        </TableCell>
                        <TableCell>
                          &#8369;{row.totalPrice.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {row.isPaid ? <CheckIcon /> : <CloseIcon />}
                        </TableCell>
                        <TableCell>
                          {row.isDelivered ? <CheckIcon /> : <CloseIcon />}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => history.push(`/orders/${row._id}`)}
                          >
                            Details
                          </Button>
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
            count={orders.length}
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

export default MyOrders;
