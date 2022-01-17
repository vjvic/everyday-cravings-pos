import React from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";

const Payment = ({ activeStep, handleBack, handleNext, steps }) => {
  return (
    <div>
      <Typography variant="h4" sx={{ paddingBottom: 2 }}>
        PAYMENT METHOD
      </Typography>

      <Typography variant="h5">Select Payment</Typography>
      <Box
        component="form"
        my={3}
        sx={{
          "& > :not(style)": { my: 1 },
          maxWidth: 900,
        }}
      >
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            defaultValue="cod"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="cod"
              control={<Radio color="secondary" />}
              label="Cash on Delivery"
            />
          </RadioGroup>
        </FormControl>

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

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Payment;
