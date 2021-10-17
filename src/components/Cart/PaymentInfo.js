import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import { Box } from "@mui/system";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const PaymentInfo = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Payment Info
        </Typography>

        <Divider />

        <Box my={4}>
          <Typography variant="body" component="p">
            Payment Method
          </Typography>
          <Stack direction="row" spacing={2} my={2}>
            <Button variant="outlined" startIcon={<LocalShippingIcon />}>
              Cash on Delivery
            </Button>
            <Button variant="outlined" size="large">
              Gcash
            </Button>
          </Stack>
        </Box>
        <Divider />

        <Box
          my={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="h2">
            Total:
          </Typography>

          <Typography variant="body" component="span" fontWeight="bold">
            &#8369; 2000
          </Typography>
        </Box>

        <Button fullWidth variant="contained" size="large">
          Check Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
