import React, { useState } from "react";
import {
  Grid,
  Paper,
  IconButton,
  Box,
  Button,
  capitalize,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToMealIngredient } from "../../../redux/actions/ingredientAction";
import { useDispatch } from "react-redux";

const IngredientItem = ({ ing, countInStock }) => {
  const [qtyInMeal, setQtyInMeal] = useState(Number(countInStock));

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    if (qtyInMeal !== 0) {
      dispatch(addToMealIngredient(ing._id, qtyInMeal));
      setQtyInMeal(0);
    }
  };

  return (
    <Grid item lg={6}>
      <Paper
        sx={{
          padding: 1,
          paddingX: 3,
          marginY: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
        }}
      >
        <div> {capitalize(ing.name)} </div>
        {ing.qty === 0 ? (
          <Typography sx={{ color: "red" }}>Out of stock</Typography>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div>
              <IconButton
                onClick={() => setQtyInMeal(qtyInMeal - 1)}
                disabled={qtyInMeal <= 0}
              >
                <RemoveIcon />
              </IconButton>
              <span>{qtyInMeal}</span>
              <IconButton
                onClick={() => setQtyInMeal(qtyInMeal + 1)}
                disabled={ing.qty === qtyInMeal}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Button onClick={handleAdd}>Add</Button>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default IngredientItem;
