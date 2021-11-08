import React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, List, ListItem, ListItemText } from "@mui/material";
import Reservation from "components/Forms/Reservation/Reservation";
import bookSvg from "assets/image/book.svg";

const location = ["Street name", "City name", "222-222-222"];

const hoursOperation = [
  "Monday - Friday 12:00am - 10:00pm",
  "Saturday - Sunday 12:00am - 10:00pm",
];

const BookPage = () => {
  const restoDets = (
    <>
      <Box>
        <Typography variant="h5">Located in the Philippines</Typography>
        <List>
          {location.map((item) => (
            <ListItem key={item} sx={{ padding: "5px 0" }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h5">Hours of Operation</Typography>
        <List>
          {hoursOperation.map((item) => (
            <ListItem key={item} sx={{ padding: "5px 0" }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <div>
      <Box pb={5}>
        <Typography variant="h4" component="h1" sx={{ paddingBottom: "1rem" }}>
          Make a Reservation
        </Typography>

        <Typography variant="body" component="p">
          Please remember that, you can book a table with maximum of 4 guests.
        </Typography>
      </Box>

      {/* Form */}

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Reservation />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3}>
          {restoDets}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div>
            <img src={bookSvg} alt="book" width="100%" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookPage;
