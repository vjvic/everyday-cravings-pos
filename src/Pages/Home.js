import React from "react";
import Hero from "components/Hero/Hero";
import FoodCarousel from "components/Foods/Carousel/Carousel";
import useFetch from "components/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
  const { data: popular, loading: popularLoading } = useFetch("search.php?s= ");
  const { data: newDish, loading: newLoading } = useFetch("search.php?s=f");
  const { data: today, loading: todayLoading } = useFetch("search.php?s=g");

  if (popularLoading || newLoading || todayLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Hero />
      <FoodCarousel dummyData={popular} text={"Popular"} />
      <FoodCarousel dummyData={newDish} text={"New"} />
      <FoodCarousel dummyData={today} text={"Dish for Today"} />
    </div>
  );
};

export default Home;
