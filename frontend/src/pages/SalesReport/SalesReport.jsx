import React, { useEffect } from "react";
import { Typography, Container, capitalize } from "@mui/material";
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
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Customer Name",
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
      field: "orderType",
      headerName: "Order Type",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">{capitalize(params.row.orderType)}</div>
        );
      },
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">{capitalize(params.row.paymentType)}</div>
        );
      },
    },
    {
      field: "paid",
      headerName: "Paid",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem"> &#8369; {params.row.paid.toFixed(2)}</div>
        );
      },
    },
    {
      field: "change",
      headerName: "Change",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem"> &#8369; {params.row.change.toFixed(2)}</div>
        );
      },
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
      field: "discount",
      headerName: "Discount",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {" "}
            &#8369; {params.row.discount.toFixed(2)}
          </div>
        );
      },
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
    dispatch(getOrderCashierList());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
        Sales Report
      </Typography>

      <div style={{ height: 500, maxWidth: "100%" }}>
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
