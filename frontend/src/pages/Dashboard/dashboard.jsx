import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChart from "../../components/Charts/BarChart";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { getMealList } from "../../redux/actions/mealAction";
import { format } from "date-fns";

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

  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orderList
  );
  const { meals, loading: mealsLoading } = useSelector(
    (state) => state.mealList
  );

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
    getRevenueToday("18"),
    getRevenueToday("19"),
    getRevenueToday("20"),
  ];

  useEffect(() => {
    dispatch(getOrderList());
    dispatch(getMealList());
  }, [dispatch]);

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

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
        Dashboard
      </Typography>

      <div>
        <Grid container spacing={2}>
          {cardItems.map((item) => (
            <Grid item xs={12} sm={12} md={6} lg={3} key={item.text}>
              <Card elevation={0}>
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
                      <Typography variant="h5" component="h4" fontWeight="bold">
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

      <Card sx={{ marginTop: 5, padding: 1 }} elevation={0}>
        <Typography
          variant="h5"
          component="h3"
          fontWeight="bold"
          sx={{ marginTop: 5, marginX: 2 }}
        >
          Today's Revenue
        </Typography>

        <Typography
          variant="body"
          component="p"
          sx={{ marginTop: 1, marginX: 2 }}
        >
          Total revenue for today:{" "}
          <Typography variant="body" sx={{ color: "green" }}>
            &#8369; {getTotalRevenueToday()}
          </Typography>
        </Typography>

        <BarChart revenueData={revenueData} />
      </Card>
    </div>
  );
};

export default DashboardPage;
