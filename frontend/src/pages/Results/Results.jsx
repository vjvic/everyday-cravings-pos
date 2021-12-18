import React, { useEffect } from "react";
import { useParams } from "react-router";
import Item from "../../components/Meals/Item/Item";
import { Grid, Typography, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { getMealList } from "../../redux/actions/mealAction";
import { Loader } from "../../components";

const ResultsPage = () => {
  const { keyword } = useParams();

  const { loading, meals, error } = useSelector((state) => state.mealList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealList(keyword));
  }, [dispatch, keyword]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (meals === null)
    return <Typography textAlign="center">No results found</Typography>;

  return (
    <div>
      <Box mb={3}>
        <Typography variant="h5">Search results for "{keyword}"</Typography>
      </Box>

      <Grid container spacing={2}>
        {meals &&
          meals.map((item) => (
            <Grid item xs={12} sm={12} md={6} lg={3} key={item.idMeal}>
              <Item item={item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ResultsPage;