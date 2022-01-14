import React, { useState } from "react";
import { Grid, Typography, Pagination } from "@mui/material";
import Item from "../Meals/Item/Item";
import { Box } from "@mui/material";

const MealGrid = ({ meals, text }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mealPerpage] = useState(8);

  const indexOfLastMeal = currentPage * mealPerpage;
  const indexOfFirstMeal = indexOfLastMeal - mealPerpage;
  const currentMeal = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  //change page

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        {text}
      </Typography>

      <Grid container spacing={2}>
        {currentMeal.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>

      {meals.length > 8 && (
        <Box my={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(meals.length / mealPerpage)}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </div>
  );
};

export default MealGrid;
