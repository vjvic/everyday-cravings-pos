import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  Button,
  Stack,
  Container,
  capitalize,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSupplier,
  getSupplierList,
} from "../../redux/actions/supplierAction";
import { Loader } from "../../components";
import { useHistory } from "react-router-dom";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

const Supplier = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, supplier } = useSelector((state) => state.supplierList);
  const { success: deleteSuccess } = useSelector(
    (state) => state.supplierDelete
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const columns = [
    {
      field: "id",
      headerName: "Supplier ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Supplier Name",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{capitalize(params.row.name)}</div>;
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Supplier Type",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{capitalize(params.row.type)}</div>;
      },
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isActive === "true" ? (
              <Chip label="Active" color="success" />
            ) : (
              <Chip label="Inactive" color="error" />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <IconButton
              onClick={() => history.push(`/suppliers/${params.row._id}/edit`)}
              disabled={userInfo.role !== "admin"}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row._id)}
              disabled={userInfo.role !== "admin"}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  //Delete Meal
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSupplier(id));
    }
  };

  useEffect(() => {
    dispatch(getSupplierList());
  }, [dispatch, deleteSuccess]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 3 }}
      >
        <Typography variant="h4" component="h1">
          Suppliers
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => history.push("/suppliers/edit")}
          disabled={userInfo.role !== "admin"}
        >
          Add Supplier
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={supplier}
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

export default Supplier;
