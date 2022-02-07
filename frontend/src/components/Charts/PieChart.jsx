import React from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/system";

const PieChart = ({ data }) => {
  const dineInData = data.filter((item) => item.orderType === "dine-in");
  const deliveryData = data.filter((item) => item.orderType === "delivery");

  return (
    <Box mt={7}>
      <Pie
        data={{
          labels: ["Dine-in", "Delivery/Pickup"],
          datasets: [
            {
              label: "Revenue",
              data: [dineInData.length, deliveryData.length],
              fill: true,
              lineTension: 0.5,
              backgroundColor: ["rgba(255, 236, 194, 0.6)", "pink"],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
