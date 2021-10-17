import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Box } from "@mui/system";
import Confirmation from "./Confirmation";

const Reservation = () => {
  const [value, setValue] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guest, setGuest] = useState(1);
  const [userData, setUserData] = useState({});

  //Modal state
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  //Date time picker value
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && phone && value && guest) {
      setUserData({ name, email, phone, value, guest });
      console.log(userData);
      setOpen(true);
    }
  };

  const modalProps = { open, handleClose, userData };

  return (
    <>
      <Confirmation {...modalProps} />

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box py={2}>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box py={2}>
          <TextField
            label="Number of guests"
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 4 } }}
            fullWidth
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </Box>

        <Box py={2}>
          <TextField
            label="Phone number"
            variant="standard"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>

        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Date & Time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          />
        </LocalizationProvider>

        <Button variant="contained" type="submit" sx={{ height: "45px" }}>
          Book Now
        </Button>
      </Box>
    </>
  );
};

export default Reservation;
