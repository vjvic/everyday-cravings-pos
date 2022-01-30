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
import { getSupplierList } from "../../redux/actions/supplierAction";
import { Loader } from "../../components";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

const Supplier = () => {
  const dispatch = useDispatch();

  const { loading, supplier } = useSelector((state) => state.supplierList);

  const columns = [
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
            {params.row.isActive ? (
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
            /*  onClick={() => history.push(`meals/${params.row._id}/edit`)} */
            >
              <EditIcon />
            </IconButton>
            <IconButton /* onClick={() => handleDelete(params.row._id)} */>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getSupplierList());
  }, [dispatch]);

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
          /* onClick={() => history.push("meals/edit")} */
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
