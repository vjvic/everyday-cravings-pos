import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import { Alert, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getMealList, getTopMealList } from "../../redux/actions/mealAction";
import { Loader } from "../../components";
/* import Menu from "./Menu/Menu"; */
import { MealGrid } from "../../components";

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
    <Container maxWidth="xl">
      <Hero />
      {/* Top rated */}
      <MealGrid meals={topMeal} text={"Top Rated"} />

      {/*  All meals */}
      <MealGrid meals={meals} text={"All Meals"} />
    </Container>
  );
};

export default Home;
