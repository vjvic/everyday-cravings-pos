import React from "react";
import { Typography, Tabs, Tab, Grid } from "@mui/material";
import { Box } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Item from "components/Foods/Item/Item";
import useFetch from "components/hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Menu = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const theme = useTheme();

  //Breakfast
  const { data: breakfast, loading: breakfastLoading } = useFetch(
    "search.php?s=breakfast"
  );
  //Lunch
  const { data: lunch, loading: lunchLoading } = useFetch("search.php?s=v ");

  //Dinner
  const { data: dinner, loading: dinnerLoading } =
    useFetch("search.php?s=fish ");

  //Dessert
  const { data: dessert, loading: dessertLoading } =
    useFetch("search.php?s=cake ");

  //Loader

  if (breakfastLoading || lunchLoading || dinnerLoading || dessertLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <section>
      <Box px={5}>
        <Typography variant="h3" component="h1">
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
          aria-label="scrollable force tabs example"
        >
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
        {/*  Breakfast content */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            {breakfast.meals.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/*  Lunch content */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={2}>
            {lunch.meals.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/*  Dinner content */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={2}>
            {dinner.meals.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/*  Dessert content */}
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Grid container spacing={2}>
            {dessert.meals.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
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
