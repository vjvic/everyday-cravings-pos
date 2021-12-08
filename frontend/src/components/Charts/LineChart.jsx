import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";

const LineChart = () => {
  return (
    <Box mt={7}>
      <Line
        data={{
          labels: [
            "January",
            "Februrary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Revenue",
              data: [12, 19, 15, 20, 35, 30, 55, 50, 40, 60, 55, 65],
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

export default LineChart;
