import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import { Alert, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getMealList, getTopMealList } from "../../redux/actions/mealAction";
import Item from "../../components/Meals/Item/Item";
import { Loader } from "../../components";
/* import Menu from "./Menu/Menu"; */

const Home = () => {
  const { loading, meals, error } = useSelector((state) => state.mealList);

  const {
    loading: mealTopLoading,
    meals: topMeal,
    error: mealTopError,
  } = useSelector((state) => state.mealTop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealList());
    dispatch(getTopMealList());
  }, [dispatch]);

  if (mealTopLoading || loading) return <Loader />;

  if (mealTopError || error)
    return <Alert severity="error">{mealTopError || error}</Alert>;

  return (
    <div>
      <Hero />
      {/*  <Menu meals={meals} /> */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Top Rated
      </Typography>

      <Grid container spacing={2}>
        {topMeal.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ marginY: 2 }}>
        All Meals
      </Typography>
      <Grid container spacing={2}>
        {meals.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
