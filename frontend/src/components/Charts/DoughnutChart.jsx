import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/system";

const DoughnutChart = ({ data }) => {
  const cashData = data.filter((item) => item.paymentType === "cash").length;
  const creditData = data.filter(
    (item) => item.paymentType === "credit/debit-card"
  ).length;
  const codData = data.filter((item) => item.paymentType === "cod").length;
  const gcashData = data.filter((item) => item.paymentType === "gcash").length;

  const dataObj = {
    labels: ["Cash", "Credit/Debit-Card", "COD", "GCASH"],
    datasets: [
      {
        label: "Revenue",
        data: [cashData, creditData, codData, gcashData],
        fill: true,
        lineTension: 0.5,
        backgroundColor: ["#27BB01", "#E6D879", "pink", "#0679F3"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
  };

  return (
    <Box mt={7}>
      <Doughnut data={dataObj} height={400} width={600} options={options} />
    </Box>
  );
};

export default DoughnutChart;
