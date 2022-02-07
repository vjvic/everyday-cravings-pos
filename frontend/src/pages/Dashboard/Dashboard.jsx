import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getOrderCashierList } from "../../redux/actions/orderAction";
import { getMealList } from "../../redux/actions/mealAction";
import { listUsers } from "../../redux/actions/userActions";
import { format } from "date-fns";
import { BarChart, Loader, PieChart, DoughnutChart } from "../../components";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { getAllDaysOfMonth, getAllMonthsOfYear } from "../../utils/utils";

const style = {
  fontSize: "50px",
  borderRadius: 1000,
  background: "#FFECC2",
  height: 75,
  width: 75,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const fontSize = {
  lg: 22,
  md: 20,
  sm: 19,
  xs: 18,
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("Today");

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orderCashierList);
  const {
    meals,
    loading: mealsLoading,
    error: mealsError,
  } = useSelector((state) => state.mealList);

  const { users } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getOrderCashierList());
    dispatch(getMealList());
    dispatch(listUsers());
  }, [dispatch]);

  if (ordersLoading || mealsLoading) return <Loader />;
  /* if (orders === undefined && meals === undefined) return ""; */
  if (ordersError || mealsError)
    return <Alert severity="error">{ordersError || mealsError}</Alert>;

  //Total amount
  const amount = orders.map((order) => order.totalPrice);
  const totalAmount = amount.reduce((acc, amount) => acc + amount, 0);

  //Total cashier
  /*   const totalCashier = users.filter((user) => user.role === "cashier");
   */ /*   const uniqueCustomer = [...new Set(customer)];
  const totalCustomer = uniqueCustomer.length; */

  //Total orders
  const totalOrders = orders ? orders.length : null;

  //Total menu
  const totalMenu = meals ? meals.length : null;

  //Get revenue for specific time
  const getRevenueToday = (time) => {
    const orderTime = orders
      .filter((order) => {
        const orderDate = format(new Date(order.createdAt), "HH P");
        const dateNow = format(new Date(), "P");

        return orderDate === `${time} ${dateNow}`;
      })
      .map((order) => order.totalPrice)
      .reduce((acc, amount) => acc + amount, 0);
    return orderTime;
  };

  //Return the revenue for the month
  const getRevenueThisMonth = (day) => {
    const orderMonth = orders
      .filter((order) => {
        const filterMonth = format(new Date(order.createdAt), "d MM");
        const currentMonth = format(new Date(), "MM");

        return filterMonth === `${day} ${currentMonth}`;
      })
      .map((order) => order.totalPrice)
      .reduce((acc, amount) => acc + amount, 0);

    return orderMonth;
  };

  //Return the revenue for the year
  const getRevenueThisYear = (month) => {
    const orderYear = orders
      .filter((order) => {
        const filterYear = format(new Date(order.createdAt), "MMM yyyy");
        const currentYear = format(new Date(), "yyyy");

        return filterYear === `${month} ${currentYear}`;
      })
      .map((order) => order.totalPrice)
      .reduce((acc, amount) => acc + amount, 0);

    return orderYear;
  };

  //Return total revenue for today
  const getTotalRevenueToday = () => {
    const totalAmount = orders
      .filter((order) => {
        const orderDate = format(new Date(order.createdAt), "P");
        const dateNow = format(new Date(), "P");

        return orderDate === dateNow;
      })
      .map((order) => order.totalPrice)
      .reduce((acc, amount) => acc + amount, 0);

    return totalAmount;
  };

  //Today revenue data
  const revenueToday = [
    getRevenueToday("06"),
    getRevenueToday("07"),
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
    getRevenueToday("21"),
    getRevenueToday("22"),
    getRevenueToday("23"),
  ];

  //This month revenue data
  const revenueThisMonth = getAllDaysOfMonth().map((d) =>
    getRevenueThisMonth(d)
  );

  //This year revenue data
  const revenueThisYear = getAllMonthsOfYear().map((m) =>
    getRevenueThisYear(m)
  );

  //Return data based on selected date
  const selectedDate = (date) => {
    if (date === "Today") {
      return revenueToday;
    } else if (date === "This Month") {
      return revenueThisMonth;
    } else if (date === "This Year") {
      return revenueThisYear;
    }
  };

  // Card Items
  const cardItems = [
    {
      icon: (
        <FastfoodOutlinedIcon sx={{ fontSize: "35px", color: "#DE8538" }} />
      ),
      number: totalMenu,
      text: "Total Menus",
    },
    {
      icon: (
        <TrendingUpOutlinedIcon sx={{ fontSize: "35px", color: "#DE8538" }} />
      ),
      number: "₱" + totalAmount.toFixed(2),
      text: "Total Revenue",
    },
    {
      icon: (
        <AssignmentOutlinedIcon sx={{ fontSize: "35px", color: "#DE8538" }} />
      ),
      number: totalOrders,
      text: "Total Orders",
    },
    {
      icon: (
        <PeopleAltOutlinedIcon sx={{ fontSize: "35px", color: "#DE8538" }} />
      ),
      number: users && users.filter((user) => user.role === "cashier").length,
      text: "Total Cashiers",
    },
  ];

  //Return text based on selected date
  const dateText = () => {
    if (date === "Today") {
      return "Today";
    } else if (date === "This Month") {
      return "This Month";
    } else if (date === "This Year") {
      return "This Year";
    }
  };

  //Return totol revenue based on selected date
  const getTotalRevenue = () => {
    if (date === "Today") {
      return getTotalRevenueToday();
    } else if (date === "This Month") {
      return revenueThisMonth.reduce((acc, amount) => acc + amount, 0);
    } else if (date === "This Year") {
      return revenueThisYear.reduce((acc, amount) => acc + amount, 0);
    }
  };

  return (
    <Container maxWidth="xl">
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
                        sx={{ fontSize }}
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

      <Card sx={{ marginTop: 4 }}>
        <CardContent>
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h5"
                component="h3"
                fontWeight="bold"
                sx={{ marginTop: 5 }}
              >
                Revenue
              </Typography>

              <Typography variant="body" component="p" sx={{ marginTop: 1 }}>
                Total revenue for {dateText()}:{" "}
                {mealsLoading || ordersLoading ? (
                  "loading..."
                ) : (
                  <Typography variant="body" sx={{ color: "green" }}>
                    &#8369; {getTotalRevenue().toFixed(2)}
                  </Typography>
                )}
              </Typography>
            </div>

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel>Date Filters</InputLabel>
              <Select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                label="Date Filters"
              >
                {["Today", "This Month", "This Year"].map((d, index) => (
                  <MenuItem key={index} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <BarChart revenueData={selectedDate(date)} date={date} />
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item lg={6} sm={12} xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ paddingTop: 2 }}>
              {" "}
              Order Type
            </Typography>
            <PieChart data={orders} />
          </Paper>
        </Grid>
        <Grid item lg={6} sm={12} xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ paddingTop: 2 }}>
              {" "}
              Payment Type
            </Typography>
            <DoughnutChart data={orders} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
