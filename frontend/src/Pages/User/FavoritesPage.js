import React from "react";
/* import { Box } from "@mui/system";
import { Typography, Grid, CircularProgress } from "@mui/material";
import useFetch from "components/hooks/useFetch";
import Item from "components/Meals/Item/Item"; */

const FavoritesPage = () => {
  /*  const { data: favorites, loading } = useFetch("search.php?s= "); */

  /* if (loading)
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
    ); */

  /* const dummyFavorites = favorites.meals.slice(0, 6); */

  return (
    <div>
      {/*    <Box mb={5}>
        <Typography variant="h4" component="h1">
          Favorites
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {dummyFavorites.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={item.idMeal}>
            <Item item={item} favorite={true} />
          </Grid>
        ))}
      </Grid> */}
      Favorites
    </div>
  );
};

export default FavoritesPage;
