import React from "react";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const location = ["Street name", "City name"];

const hoursOperation = [
  "Monday - Friday 12:00am - 10:00pm",
  "Saturday - Sunday 12:00am - 10:00pm",
];

const About = () => {
  return (
    <Container>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h3" component="h1" pb={2}>
              About
            </Typography>

            <Typography variant="body" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              test
            </Typography>
          </Grid>

          <Grid item sm={12} lg={6}>
            <img
              src="https://images.pexels.com/photos/6341164/pexels-photo-6341164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="resto"
              width="100%"
              style={{ borderRadius: 10 }}
            />
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item sm={12} lg={6}>
          <Typography variant="h3" component="h1" pb={2}>
            Hours
          </Typography>

          <List>
            {hoursOperation.map((item) => (
              <ListItem key={item} sx={{ padding: "5px 0" }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item sm={12} lg={6}>
          <Typography variant="h3" component="h1" pb={2}>
            Location
          </Typography>

          <List>
            {location.map((item) => (
              <ListItem key={item} sx={{ padding: "5px 0" }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
