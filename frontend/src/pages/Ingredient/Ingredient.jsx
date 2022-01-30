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
import { getIngredientList } from "../../redux/actions/ingredientAction";
import { Loader } from "../../components";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

const Ingredient = () => {
  const dispatch = useDispatch();

  const { loading, ingredient } = useSelector((state) => state.ingredientList);

  const columns = [
    {
      field: "name",
      headerName: "Ingredient Name",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{capitalize(params.row.name)}</div>;
      },
    },
    {
      field: "qty",
      headerName: "Qty",
      flex: 1,
    },
    {
      field: "measure",
      headerName: "UOM(unit of measure)",
      flex: 1,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
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
    dispatch(getIngredientList());
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
          Ingredients
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          /* onClick={() => history.push("meals/edit")} */
        >
          Add Ingredient
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={ingredient}
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

export default Ingredient;
