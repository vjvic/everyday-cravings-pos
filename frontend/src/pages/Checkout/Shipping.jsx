import React from "react";
import { Typography, TextField, Box, Button } from "@mui/material";

const Shipping = ({ activeStep, handleBack, handleNext, steps }) => {
  return (
    <div>
      <Typography variant="h4">SHIPPING</Typography>

      <Box
        component="form"
        my={3}
        sx={{
          "& > :not(style)": { my: 1 },
          maxWidth: 900,
        }}
      >
        <TextField
          label="Address"
          variant="filled"
          fullWidth
          color="secondary"
        />

        <TextField label="City" variant="filled" fullWidth color="secondary" />

        <TextField
          label="Postal Code"
          variant="filled"
          fullWidth
          color="secondary"
        />

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button color="primary" variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Shipping;
