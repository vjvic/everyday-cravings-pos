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
  GridToolbarExport,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const SalesReport = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orderList);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 100,
      valueGetter: (params) => params.row.user.name,
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
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
    },
    {
      field: "totalItems",
      headerName: "Total Items",
      type: "number",
      width: 100,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      type: "number",
      width: 100,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
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

      <div style={{ height: 500, maxWidth: 950 }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  );
};

export default SalesReport;
