import React from "react";
import { Button, Typography, Fade, Modal, Box, Backdrop } from "@mui/material";
import { format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Confirmation = ({ handleClose, open, userData }) => {
  const { name, value, guest } = userData;

  const date = value ? format(userData.value, "PP") : "";
  const time = value ? format(userData.value, "hh:mm aaa") : "";

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Summary
            </Typography>

            <Typography
              variant="body"
              component="div"
              sx={{ mt: 2, marginBottom: 2 }}
            >
              Reservation for <strong>{name}</strong>, {guest}
              guests , {date}, {time} at Street name, City name
            </Typography>

            <Button variant="contained" onClick={handleClose}>
              Confirm
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Confirmation;
