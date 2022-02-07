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
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientList,
  deleteIngredient,
} from "../../redux/actions/ingredientAction";
import { Loader } from "../../components";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const Ingredient = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, ingredient } = useSelector((state) => state.ingredientList);
  const { success } = useSelector((state) => state.ingredientDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  const columns = [
    {
      field: "id",
      headerName: "Ingredient ID",
      flex: 1,
    },
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
      renderCell: (params) => {
        return (
          <div className="rowitem"> {capitalize(params.row.supplier)}</div>
        );
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem"> &#8369; {params.row.cost.toFixed(2)}</div>
        );
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
              onClick={() =>
                history.push(`/ingredients/${params.row._id}/edit`)
              }
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
    /* if (window.confirm("Are you sure")) {
      dispatch(deleteIngredient(id));
    }
    */
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIngredient(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getIngredientList());
  }, [dispatch, success]);

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
          onClick={() => history.push("ingredients/edit")}
          disabled={userInfo.role !== "admin"}
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
