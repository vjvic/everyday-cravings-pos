import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import { CircularProgress, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { getMealList } from "../../redux/actions/mealAction";
import Menu from "../../components/Meals/Menu/Menu";

const HomePage = () => {
  const { loading, meals, error } = useSelector((state) => state.mealList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealList());
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

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Hero />
      <Menu meals={meals} />
    </div>
  );
};

export default HomePage;
