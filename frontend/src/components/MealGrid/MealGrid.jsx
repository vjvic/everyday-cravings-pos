import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  capitalize,
  Container,
  Divider,
  TextField,
} from "@mui/material";
import Item from "../Meals/Item/Item";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../redux/actions/categoryAction";

const MealGrid = ({ meals, text }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mealPerpage] = useState(8);

  const [mealCategory, setMealCategory] = useState("all");
  const [filterName, setFilterName] = useState("");

  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.categoryList);

  const filterCategory = () => {
    if (mealCategory === "all") {
      return meals;
    } else {
      return meals.filter((meal) => meal.category === mealCategory);
    }
  };

  const filterByName = () => {
    if (filterName) {
      return filterCategory().filter((meal) =>
        Object.values(meal)
          .join(" ")
          .toLowerCase()
          .includes(filterName.toLowerCase())
      );
    } else {
      return filterCategory();
    }
  };

  console.log(filterByName());

  const indexOfLastMeal = currentPage * mealPerpage;
  const indexOfFirstMeal = indexOfLastMeal - mealPerpage;
  const currentMeal = filterByName().slice(indexOfFirstMeal, indexOfLastMeal);

  //change page

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        {text}
      </Typography>

      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: 200, marginBottom: 3, marginTop: 4 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={mealCategory}
            label="Category"
            onChange={(e) => setMealCategory(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {category.map((c) => (
              <MenuItem value={c.category.toLowerCase()} key={c}>
                {capitalize(c.category)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Meal"
          variant="standard"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </Box>

      <Grid container spacing={2}>
        {currentMeal.map((item) => (
          <Grid item xs={12} sm={12} md={4} lg={3} key={item._id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>

      {filterByName().length > 8 && (
        <Box my={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(filterByName().length / mealPerpage)}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Container>
  );
};

export default MealGrid;
