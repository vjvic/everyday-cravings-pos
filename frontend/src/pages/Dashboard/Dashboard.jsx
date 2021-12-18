import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  capitalize,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { getMealList } from "../../redux/actions/mealAction";
import { format } from "date-fns";
import { BarChart, Loader } from "../../components";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const style = {
  fontSize: "50px",
  borderRadius: 1000,
  background: "#FFECC2",
  height: 80,
  width: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const DashboardPage = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orderList);
  const {
    meals,
    loading: mealsLoading,
    error: mealsError,
  } = useSelector((state) => state.mealList);

  useEffect(() => {
    dispatch(getOrderList());
    dispatch(getMealList());
  }, [dispatch]);

  if (ordersLoading || mealsLoading) return <Loader />;
  if (orders === undefined && meals === undefined) return "";
  if (ordersError || mealsError)
    return <Alert severity="error">{ordersError || mealsError}</Alert>;

  //Total amount
  const amount = orders.map((order) => order.totalAmount);
  const totalAmount = amount.reduce((acc, amount) => acc + amount, 0);

  //Total customers
  const customer = orders.map((order) => order.customerName);
  const uniqueCustomer = [...new Set(customer)];
  const totalCustomer = uniqueCustomer.length;

  //Total orders
  const totalOrders = orders ? orders.length : null;

  //Total menu
  const totalMenu = meals ? meals.length : null;

  //Get revenue for specific time
  const getRevenueToday = (time) => {
    const orderTime = orders.filter((order) => {
      const orderDate = format(new Date(order.date), "HH P");
      const dateNow = format(new Date(), "P");

      return orderDate === `${time} ${dateNow}`;
    });

    const amount = orderTime.map((order) => order.totalAmount);

    const totalAmount = amount.reduce((acc, amount) => acc + amount, 0);

    return totalAmount;
  };

  const getTotalRevenueToday = () => {
    const orderTime = orders.filter((order) => {
      const orderDate = format(new Date(order.date), "P");
      const dateNow = format(new Date(), "P");

      return orderDate === dateNow;
    });

    const amount = orderTime.map((order) => order.totalAmount);

    const totalAmount = amount.reduce((acc, amount) => acc + amount, 0);

    return totalAmount;
  };

  const revenueData = [
    getRevenueToday("08"),
    getRevenueToday("09"),
    getRevenueToday("10"),
    getRevenueToday("11"),
    getRevenueToday("12"),
    getRevenueToday("13"),
    getRevenueToday("14"),
    getRevenueToday("15"),
    getRevenueToday("16"),
    getRevenueToday("17"),
    getRevenueToday("18"),
    getRevenueToday("19"),
    getRevenueToday("20"),
  ];

  const cardItems = [
    {
      icon: (
        <FastfoodOutlinedIcon sx={{ fontSize: "40px", color: "#DE8538" }} />
      ),
      number: totalMenu,
      text: "Total Menus",
    },
    {
      icon: (
        <TrendingUpOutlinedIcon sx={{ fontSize: "40px", color: "#DE8538" }} />
      ),
      number: "₱" + totalAmount,
      text: "Total Revenue",
    },
    {
      icon: (
        <AssignmentOutlinedIcon sx={{ fontSize: "40px", color: "#DE8538" }} />
      ),
      number: totalOrders,
      text: "Total Orders",
    },
    {
      icon: (
        <PeopleAltOutlinedIcon sx={{ fontSize: "40px", color: "#DE8538" }} />
      ),
      number: totalCustomer,
      text: "Total Customers",
    },
  ];

  //Get the total of occurence in array
  const topCustomer = orders.reduce((res, val) => {
    if (res[val.customerName]) {
      res[val.customerName]++;
    } else {
      res[val.customerName] = 1;
    }
    return res;
  }, {});

  //Sort by the highest
  const sortName = Object.entries(topCustomer)
    .sort((a, b) => b[1] - a[1])
    .map((v) => v[0]);

  /* const sortName = []; */

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
        Dashboard
      </Typography>

      <div>
        <Grid container spacing={2}>
          {cardItems.map((item) => (
            <Grid item xs={12} sm={12} md={6} lg={3} key={item.text}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gridGap: "1rem",
                    }}
                  >
                    <Box sx={style}>{item.icon}</Box>

                    <div>
                      <Typography
                        variant={mealsLoading || ordersLoading ? "body" : "h5"}
                        component="h4"
                        fontWeight="bold"
                      >
                        {mealsLoading || ordersLoading
                          ? "loading..."
                          : item.number}
                      </Typography>
                      <Typography variant="body1" component="h4">
                        {item.text}
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Grid container spacing={2} sx={{ marginTop: 5, padding: 1 }}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          {sortName.length <= 0 ? (
            " "
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Top Customer
                </Typography>

                <List>
                  {sortName.slice(0, 5).map((top, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>#{index + 1}</ListItemIcon>

                      <ListItemText primary={capitalize(top)} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={sortName <= 0 ? 12 : 9}
          lg={sortName <= 0 ? 12 : 9}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="h3"
                fontWeight="bold"
                sx={{ marginTop: 5 }}
              >
                Today's Revenue
              </Typography>

              <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
                Total revenue for today:{" "}
                {mealsLoading || ordersLoading ? (
                  "loading..."
                ) : (
                  <Typography variant="body" sx={{ color: "green" }}>
                    &#8369; {getTotalRevenueToday()}
                  </Typography>
                )}
              </Typography>

              <BarChart revenueData={revenueData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
