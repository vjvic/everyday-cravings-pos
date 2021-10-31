import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({ strArea, strMeal, strMealThumb }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={strMealThumb}
        alt={strMeal}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography component="h3" variant="h5">
            {strMeal}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {strArea}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" component="div">
            &#8369; 500
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <RemoveIcon />
      </IconButton>
      <div>1</div>
      <IconButton>
        <AddIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;
