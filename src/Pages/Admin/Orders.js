import React from "react";
import Table from "components/Table/Table";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Orders = () => {
  return (
    <div>
      <Box mb={5}>
        <Typography variant="h4" component="h1">
          Orders Page List
        </Typography>
      </Box>

      <Table />
    </div>
  );
};

export default Orders;
