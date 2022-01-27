import React, { useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";
import { Loader } from "../../components";
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

const SalesReport = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orderList);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "user",
      headerName: "User",
      valueGetter: (params) => params.row.user.name,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {format(new Date(params.row.createdAt), "yyyy-MM-dd")}
          </div>
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "totalItems",
      headerName: "Total Items",
      type: "number",
      flex: 1,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      type: "number",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
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
  ];

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
        Sales Report
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}

          /*  componentsProps={{
          panel: {
            sx: {
              ".css-870lsu-MuiButtonBase-root-MuiButton-root": {
                color: "dodgerblue",
                fontSize: 20,
                display: "none",
              },
              "& .MuiDataGrid-filterForm": {
                bgcolor: "lightblue",
              },
              "& .MuiSwitch-input": {
                backgroundColor: "red",
              },
            },
          },
        }} */
        />
      </div>
    </Container>
  );
};

export default SalesReport;
