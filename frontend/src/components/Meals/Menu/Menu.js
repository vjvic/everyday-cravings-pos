import React, { useState } from "react";
import { Typography, Tabs, Tab, Grid } from "@mui/material";
import { Box } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Item from "components/Meals/Item/Item";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Menu = ({ meals }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const theme = useTheme();

  //filter breakfast in array
  const breakfast = meals
    ? meals.filter((meal) => meal.category === "breakfast")
    : [];
  //filter lunch in array
  const lunch = meals ? meals.filter((meal) => meal.category === "lunch") : [];
  //filter dinner in array
  const dinner = meals
    ? meals.filter((meal) => meal.category === "dinner")
    : [];
  //filter dessert in array
  const dessert = meals
    ? meals.filter((meal) => meal.category === "dessert")
    : [];

  return (
    <section>
      <Box px={5}>
        <Typography variant="h4" component="h1">
          Menu
        </Typography>
      </Box>

      <Box py={5}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="All" />
          <Tab label="Breakfast" />
          <Tab label="Lunch" />
          <Tab label="Dinner" />
          <Tab label="Dessert" />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/*  All content */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            {meals &&
              meals.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Item item={item} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/*  Breakfast content */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={2}>
            {breakfast &&
              breakfast.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Item item={item} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/*  Lunch content */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={2}>
            {lunch &&
              lunch.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Item item={item} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/*  Dinner content */}
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Grid container spacing={2}>
            {dinner &&
              dinner.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Item item={item} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/*  Dessert content */}
        <TabPanel value={value} index={4} dir={theme.direction}>
          <Grid container spacing={2}>
            {dessert &&
              dessert.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Item item={item} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </section>
  );
};

export default Menu;
