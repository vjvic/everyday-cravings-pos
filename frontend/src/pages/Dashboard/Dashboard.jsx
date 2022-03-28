import { useState, useEffect } from "react";
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
import { getAllDaysOfMonth, getAllMonthsOfYear } from "../../utils/utils";
import Stats from "./Stats";

const revenueTime = [
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("Today");

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orderCashierList);
  const { loading: mealsLoading, error: mealsError } = useSelector(
    (state) => state.mealList
  );

  useEffect(() => {
    dispatch(getOrderCashierList());
    dispatch(getMealList());
    dispatch(listUsers());
  }, [dispatch]);

  if (ordersLoading || mealsLoading) return <Loader />;
  if (ordersError || mealsError)
    return <Alert severity="error">{ordersError || mealsError}</Alert>;

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

  const revenueToday = revenueTime.map((time) => getRevenueToday(time));

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

  //Return total revenue based on selected date
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

      <Stats />

      <Card sx={{ marginTop: 4 }} elevation={0}>
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
          <Paper sx={{ padding: 2 }} elevation={0}>
            <Typography variant="h5" fontWeight="bold" sx={{ paddingTop: 2 }}>
              {" "}
              Order Type
            </Typography>
            <PieChart data={orders} />
          </Paper>
        </Grid>
        <Grid item lg={6} sm={12} xs={12}>
          <Paper sx={{ padding: 2 }} elevation={0}>
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
