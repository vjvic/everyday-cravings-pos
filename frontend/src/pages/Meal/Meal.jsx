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
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { deleteMeal } from "../../redux/actions/mealAction";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getMealList } from "../../redux/actions/mealAction";
import { Loader } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

const MealsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { meals, loading: mealsLoading } = useSelector(
    (state) => state.mealList
  );

  const { success: deleteSuccess } = useSelector((state) => state.mealDelete);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Delete Meal
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteMeal(id));
    }
  };

  //Return filter item

  const filterByCategory = (order) => {
    if (selectedCategory === "Breakfast") {
      return order.category === "breakfast";
    } else if (selectedCategory === "Lunch") {
      return order.category === "lunch";
    } else if (selectedCategory === "Dinner") {
      return order.category === "dinner";
    } else if (selectedCategory === "Dessert") {
      return order.cateory === "dessert";
    } else if (selectedCategory === "All") {
    } else if (selectedCategory === "Drinks") {
      return order.cateory === "drinks";
    } else if (selectedCategory === "All") {
      return order;
    } else {
      return order;
    }
  };

  const filterItem = (order) => {
    if (searchTerm !== "" && selectedCategory) {
      return (
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) && filterByCategory(order)
      );
    }

    if (searchTerm !== "") {
      return (
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) && filterByCategory(order)
      );
    } else if (selectedCategory) {
      return filterByCategory(order);
    } else {
      return order;
    }
  };

  // render/re render meal list
  useEffect(() => {
    dispatch(getMealList());
  }, [dispatch, deleteSuccess]);

  if (mealsLoading) return <Loader />;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
            Meal List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => history.push("meals/edit")}
          >
            Add Meal
          </Button>
        </Stack>

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
            <InputLabel>Filter by category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Filter by category"
            >
              {["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Drinks"].map(
                (c, index) => (
                  <MenuItem key={index} value={c}>
                    {c}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {["ID", "Meal Name", "Price", "Category"].map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {meals &&
                  meals
                    .filter((meal) => filterItem(meal))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover key={row._id}>
                          <TableCell></TableCell>
                          <TableCell component="th" id={labelId} scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>&#8369; {row.price}</TableCell>
                          <TableCell sx={{ textTransform: "Capitalize" }}>
                            {row.category}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                history.push(`meals/${row._id}/edit`)
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
            count={meals ? meals.length : 0}
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

export default MealsPage;
