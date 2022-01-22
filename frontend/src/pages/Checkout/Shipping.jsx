import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartAction";

const fontSize = {
  lg: 35,
  md: 30,
  sm: 28,
  xs: 25,
};

const Shipping = ({ activeStep, handleBack, handleNext, steps }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { shippingAddress } = useSelector((state) => state.cartAddress);

  const dispatch = useDispatch();

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (address && city && province && postalCode) {
      dispatch(saveShippingAddress({ address, city, province, postalCode }));
      handleNext();
    }
  };

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setProvince(shippingAddress.province);
      setPostalCode(shippingAddress.postalCode);
    }
  }, [shippingAddress]);

  return (
    <div>
      <Typography variant="h4" sx={{ fontSize }}>
        SHIPPING
      </Typography>

      <Box
        component="form"
        my={3}
        sx={{
          "& > :not(style)": { my: 1 },
          maxWidth: 900,
        }}
        onSubmit={handleSubmitAddress}
      >
        <TextField
          label="Address"
          variant="filled"
          fullWidth
          color="secondary"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <TextField
          label="City"
          variant="filled"
          fullWidth
          color="secondary"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <TextField
          label="Province"
          variant="filled"
          fullWidth
          color="secondary"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        />

        <TextField
          label="Postal Code"
          variant="filled"
          fullWidth
          color="secondary"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
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

          <Button
            type="submit"
            color="primary"
            variant="contained" /* onClick={handleClick} */
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Shipping;
