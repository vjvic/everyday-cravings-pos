import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useSelector } from "react-redux";

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

const Stats = () => {
  const { users } = useSelector((state) => state.userList);
  const { orders } = useSelector((state) => state.orderCashierList);
  const { meals } = useSelector((state) => state.mealList);

  //Total amount
  const amount = orders.map((order) => order.totalPrice);
  const totalAmount = amount.reduce((acc, amount) => acc + amount, 0);

  //Total orders
  const totalOrders = orders.length;

  //Total menu
  const totalMenu = meals.length;

  //Total cashier
  const totalCashier =
    users && users.filter((user) => user.role === "cashier").length;

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
      number: totalCashier,
      text: "Total Cashiers",
    },
  ];

  return (
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
                  <Typography
                    variant="h5"
                    component="h4"
                    fontWeight="bold"
                    sx={{ fontSize }}
                  >
                    {item.number}
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
  );
};

export default Stats;
