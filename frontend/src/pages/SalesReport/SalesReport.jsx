import React, { useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderCashierList } from "../../redux/actions/orderAction";
import { format } from "date-fns";
import { Loader } from "../../components";
import {
  DataGrid,
  GridToolbarContainer,
  /*   GridToolbarColumnsButton, */
  GridToolbarFilterButton,
  /*   GridToolbarDensitySelector, */
  GridToolbarExport,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      {/*  <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      <GridToolbarExport />
      {/*   <GridToolbarDensitySelector /> */}
    </GridToolbarContainer>
  );
};

const SalesReport = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orderCashierList);

  const columns = [
    /* { field: "_id", headerName: "ID", width: 250 }, */
    {
      field: "name",
      headerName: "Customer Name",
      width: 140,
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
      field: "orderType",
      headerName: "Order Type",
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
      field: "discount",
      headerName: "Discount",
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
    dispatch(getOrderCashierList());
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
