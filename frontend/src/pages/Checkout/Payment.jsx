import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/actions/cartAction";

const fontSize = {
  lg: 35,
  md: 30,
  sm: 28,
  xs: 25,
};

const Payment = ({ activeStep, handleBack, handleNext, steps }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const { paymentMethod: method } = useSelector(
    (state) => state.cartPaymentMethod
  );

  const dispatch = useDispatch();

  const handleSubmitPayment = () => {
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
      handleNext();
    }
  };

  useEffect(() => {
    if (method) {
      setPaymentMethod(method);
    }
  }, [method]);

  return (
    <div>
      <Typography variant="h4" sx={{ paddingBottom: 2, fontSize }}>
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
        onSubmit={handleSubmitPayment}
      >
        <FormControl component="fieldset">
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="Cash on Delivery"
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

          <Button type="submit" variant="contained" /* onClick={handleNext} */>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Payment;
