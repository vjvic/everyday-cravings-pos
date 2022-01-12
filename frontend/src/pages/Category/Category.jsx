import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMealByCategory } from "../../redux/actions/mealAction";
import { Loader } from "../../components";
import { Alert, Box, Typography, Grid, capitalize } from "@mui/material";
import Item from "../../components/Meals/Item/Item";

const Category = () => {
  const dispatch = useDispatch();

  const { category } = useParams();

  const { meals, loading, error } = useSelector((state) => state.mealCategory);

  useEffect(() => {
    dispatch(getMealByCategory(category));
  }, [dispatch, category]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Box mb={3}>
        <Typography variant="h5">{capitalize(category)}</Typography>
      </Box>

      {meals <= 0 ? (
        <Alert severity="warning">Not available</Alert>
      ) : (
        <Grid container spacing={2}>
          {meals &&
            meals.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3} key={item.idMeal}>
                <Item item={item} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Category;
