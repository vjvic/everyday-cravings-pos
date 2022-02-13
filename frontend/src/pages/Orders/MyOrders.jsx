import React, { /* useState, */ useEffect } from "react";
import {
  /*  Paper,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableBody,
  Table, */
  Typography,
  /*  TableHead,
  TextField, */
  Button,
  Alert,
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../components";
import { getMyOrders } from "../../redux/actions/orderAction";
import { format } from "date-fns";

import {
  DataGrid,
  GridToolbarContainer,
  /*   GridToolbarColumnsButton, */
  GridToolbarFilterButton,
  /*   GridToolbarDensitySelector, */
  /*  GridToolbarExport, */
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ displayPrint: "none" }}>
      {/*  <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/*  <GridToolbarExport /> */}
      {/*   <GridToolbarDensitySelector /> */}
    </GridToolbarContainer>
  );
};

const MyOrders = () => {
  /*   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); */

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.orderMyList);

  //Change page
  /*   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterOrders = (order) => {
    if (searchTerm !== "") {
      return Object.values(order)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      return order;
    }
  }; */

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
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
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {" "}
            &#8369;{params.row.totalPrice.toFixed(2)}
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
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => params.row.isDelivered,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isDelivered ? (
              <Chip label="Delivered" color="success" />
            ) : (
              <Chip label="processing" color="warning" />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
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

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (orders.length === 0)
    return (
      <Alert severity="warning">
        No orders back to <Link to="/">Home</Link>
      </Alert>
    );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ marginY: 3 }}>
          My Orders
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
      </Box>
    </>
  );
};

export default MyOrders;
