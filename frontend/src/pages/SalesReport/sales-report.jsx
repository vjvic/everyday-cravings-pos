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
  capitalize,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";

const SalesReport = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { orders, loading } = useSelector((state) => state.orderList);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

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
    <div>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
          Sales Report
        </Typography>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {[
                    "ID",
                    "Customer Name",
                    "Payment Type",
                    "Total Amount",
                    "Paid",
                    "Change",
                    "Total Item",
                    "Subtotal",
                    "Date",
                  ].map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover key={row._id}>
                        <TableCell></TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell>{capitalize(row.customerName)}</TableCell>
                        <TableCell>{capitalize(row.paymentType)}</TableCell>
                        <TableCell>
                          &#8369; {row.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell> &#8369;{row.paid.toFixed(2)}</TableCell>
                        <TableCell> &#8369; {row.change.toFixed(2)}</TableCell>
                        <TableCell>{row.totalItem}</TableCell>
                        <TableCell>{row.subTotal}</TableCell>
                        <TableCell>{format(new Date(row.date), "P")}</TableCell>
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
    </div>
  );
};

export default SalesReport;
