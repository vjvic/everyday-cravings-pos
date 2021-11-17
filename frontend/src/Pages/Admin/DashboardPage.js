import React from "react";
import { Box } from "@mui/system";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LineChart from "components/Charts/LineChart";

const cardItems = [
  {
    icon: <FastfoodOutlinedIcon sx={{ fontSize: "50px", color: "#DE8538" }} />,
    number: 56,
    text: "Total Menus",
  },
  {
    icon: (
      <TrendingUpOutlinedIcon sx={{ fontSize: "50px", color: "#DE8538" }} />
    ),
    number: "126k",
    text: "Total Revenue",
  },
  {
    icon: (
      <AssignmentOutlinedIcon sx={{ fontSize: "50px", color: "#DE8538" }} />
    ),
    number: 279,
    text: "Total Orders",
  },
  {
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: "50px", color: "#DE8538" }} />,
    number: 60,
    text: "Total Customers",
  },
];

const DashboardPage = () => {
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
                    <Box
                      sx={{
                        fontSize: "50px",
                        borderRadius: 1000,
                        background: "#FFECC2",
                        height: 100,
                        width: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <div>
                      <Typography variant="h4" component="h4" fontWeight="bold">
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
      </div>

      <LineChart />
    </div>
  );
};

export default DashboardPage;
