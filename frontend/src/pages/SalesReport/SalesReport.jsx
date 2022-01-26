import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/actions/orderAction";
import { format } from "date-fns";
import { Loader } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const SalesReport = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orderList);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "user",
      headerName: "User",
      flex: 1,
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
    <>
      <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
        Sales Report
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{ toolbar: { printOptions: { allColumns: true } } }}
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
    </>
  );
};

export default SalesReport;
