import React, { useEffect } from "react";
import { Typography, Button, Alert, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const MyOrders = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      valueGetter: (params) => params.row.user.name,
      /*  valueFormatter: ({ value }) => value.name, */
    },
    {
      field: "createdAt",
      headerName: "Date",
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {format(new Date(params.row.createdAt), "yyyy-MM-dd")}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {" "}
            &#8369; {params.row.totalPrice.toFixed(2)}
          </div>
        );
      },
    },
    {
      field: "isPaid",
      headerName: "Paid",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isPaid ? <CheckIcon /> : <CloseIcon />}
          </div>
        );
      },
    },
    {
      field: "isDelivered",
      headerName: "Delivered",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isDelivered ? <CheckIcon /> : <CloseIcon />}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      sortable: false,
      filter: false,
      valueGetter: (params) => params.row._id,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <Button
              variant="contained"
              onClick={() => history.push(`/orders/${params.row._id}`)}
            >
              Details
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
          Orders
        </Typography>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{ toolbar: { printOptions: { allColumns: true } } }}
        />
      </div>
    </Container>
  );
};

export default MyOrders;
