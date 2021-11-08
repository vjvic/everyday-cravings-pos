import React from "react";
import { useParams } from "react-router";
import Item from "components/Meals/Item/Item";
import useFetch from "components/hooks/useFetch";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ResultsPage = () => {
  const { query } = useParams();

  const { data: results, loading } = useFetch(`search.php?s=${query}`);

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
        <CircularProgress />
      </Box>
    );

  if (results.meals === null)
    return <Typography textAlign="center">No results found</Typography>;

  return (
    <div>
      <Box mb={3}>
        <Typography variant="h5">Search results for "{query}"</Typography>
      </Box>

      <Grid container spacing={2}>
        {results.meals.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={item.idMeal}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResultsPage;
