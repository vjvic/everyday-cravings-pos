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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";
import { Loader } from "../../components";

const SalesReport = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* const [date, setDate] = useState(""); */
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { orders, loading } = useSelector((state) => state.orderList);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const years = orders.map((order) =>
    format(new Date(order.createdAt), "yyyy")
  );
  const uniqueYears = [...new Set(years)];

  console.log(uniqueYears);
  /* 
    const filterDate = (filterDate) => {
    const currentDay = format(new Date(), "d");
    const currentMonth = format(new Date(), "MM");
    const currentYear = format(new Date(), "yyyy");
    const selectedDay = format(new Date(filterDate), "d");
    const selectedMonth = format(new Date(filterDate), "MM");
    const selectedYear = format(new Date(filterDate), "yyyy");

    if (date === "Today") {
      return selectedDay === currentDay;
    } else if (date === "This Month") {
      return selectedMonth === currentMonth;
    } else if (date === "This Year") {
      return selectedYear === currentYear;
    } else {
      return filterDate;
    }
  }; */

  const filterItem = (order) => {
    if (selectedYear && searchTerm !== "") {
      return (
        format(new Date(order.createdAt), "yyyy") === selectedYear &&
        /* filterDate(order.date) && */
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    } else if (searchTerm !== "") {
      return (
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedYear) {
      return format(new Date(order.createdAt), "yyyy") === selectedYear;
    } else {
      return order;
    }
  };

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
          Sales Report
        </Typography>

        <Box mb={2} sx={{ display: "flex", justifyContent: "end" }}>
          <TextField
            label="Search..."
            variant="standard"
            color="secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl
            color="secondary"
            variant="standard"
            sx={{ minWidth: 120, marginX: 2 }}
          >
            <InputLabel>Filter by year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Filter by year"
            >
              {uniqueYears.map((d, index) => (
                <MenuItem key={index} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/*   <FormControl
            color="secondary"
            variant="standard"
            sx={{ minWidth: 120 }}
          >
            <InputLabel>Date Filters</InputLabel>
            <Select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="Date Filters"
            >
              {["All", "Today", "This Month", "This Year"].map((d, index) => (
                <MenuItem key={index} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Box>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {[
                    "ID",
                    "User",
                    "Date",
                    "Total Items",
                    "Subtotal",
                    "Total Price",
                  ].map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders
                  .filter((order) => filterItem(order))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover key={row._id}>
                        <TableCell></TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell>{capitalize(row.user.name)}</TableCell>
                        <TableCell>
                          {format(new Date(row.createdAt), "yyyy-MM-dd")}
                        </TableCell>
                        <TableCell>{row.totalItems}</TableCell>
                        <TableCell>{row.subtotal}</TableCell>
                        <TableCell>
                          &#8369; {row.totalPrice.toFixed(2)}
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
    </div>
  );
};

export default SalesReport;
