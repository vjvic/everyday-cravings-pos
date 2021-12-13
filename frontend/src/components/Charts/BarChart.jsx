import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/system";

const BarChart = ({ revenueData }) => {
  return (
    <Box mt={7}>
      <Bar
        data={{
          labels: [
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "18:00",
            "19:00",
            "20:00",
          ],
          datasets: [
            {
              label: "Revenue",
              data: revenueData,
              fill: true,
              lineTension: 0.5,
              backgroundColor: "rgba(255, 236, 194, 0.6)",
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

export default BarChart;
