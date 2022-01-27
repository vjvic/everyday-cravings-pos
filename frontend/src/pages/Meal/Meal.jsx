import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  Button,
  Stack,
  Container,
  capitalize,
} from "@mui/material";
import { deleteMeal } from "../../redux/actions/mealAction";
import { useDispatch, useSelector } from "react-redux";
import { getMealList } from "../../redux/actions/mealAction";
import { Loader } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
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

const MealsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { meals, loading: mealsLoading } = useSelector(
    (state) => state.mealList
  );

  const { success: deleteSuccess } = useSelector((state) => state.mealDelete);

  //Delete Meal
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteMeal(id));
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Meal Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem"> {capitalize(params.row.category)}</div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return (
          <div className="rowitem"> &#8369; {params.row.price.toFixed(2)}</div>
        );
      },
    },
    {
      field: "countInStock",
      headerName: "Qty",
      flex: 1,
      type: "number",
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      sortable: false,
      filter: false,
      valueGetter: (params) => params.row._id,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <IconButton
              onClick={() => history.push(`meals/${params.row._id}/edit`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  // render/re render meal list
  useEffect(() => {
    dispatch(getMealList());
  }, [dispatch, deleteSuccess]);

  if (mealsLoading) return <Loader />;

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 3 }}
      >
        <Typography variant="h4" component="h1">
          Meal List
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => history.push("meals/edit")}
        >
          Add Meal
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={meals}
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

export default MealsPage;
