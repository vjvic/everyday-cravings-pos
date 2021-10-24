import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const MealForm = () => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { my: 1, width: "100%" },
        }}
      >
        <TextField label="Meal ID" variant="outlined" value="12356" />

        <TextField label="Meal Name" variant="outlined" value="Pancakes" />

        <TextField label="Meal Area" variant="outlined" value="American" />

        <TextField
          label="Meal Price"
          variant="outlined"
          type="number"
          value="500"
        />

        <TextField
          label="Meal Description"
          multiline
          rows={4}
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />

        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value="10">
            <MenuItem value={10}>Breakfast</MenuItem>
            <MenuItem value={20}>Lunch</MenuItem>
            <MenuItem value={30}>Dinner</MenuItem>
            <MenuItem value={40}>Dessert</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
        >
          Add Meal
        </Button>
      </Box>
    </div>
  );
};

export default MealForm;
