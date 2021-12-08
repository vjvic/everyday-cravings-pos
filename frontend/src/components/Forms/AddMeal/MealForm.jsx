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
        <TextField
          label="Meal ID"
          variant="outlined"
          color="secondary"
          value="12356"
        />

        <TextField
          label="Meal Name"
          variant="outlined"
          color="secondary"
          value="Pancakes"
        />

        <TextField
          label="Meal Area"
          variant="outlined"
          color="secondary"
          value="American"
        />

        <TextField
          label="Meal Price"
          variant="outlined"
          color="secondary"
          type="number"
          value="500"
        />

        <TextField
          label="Meal Description"
          multiline
          rows={4}
          color="secondary"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />

        <FormControl color="secondary">
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
