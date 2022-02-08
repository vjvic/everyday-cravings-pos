import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Button,
  Stack,
  Container,
  capitalize,
  Snackbar,
  Alert,
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
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ displayPrint: "none" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
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

  const { userInfo } = useSelector((state) => state.userLogin);

  const [isSnackbar, setIsSnackbar] = useState(false);

  //Delete Meal
  const handleDelete = (id) => {
    /*  if (window.confirm("Are you sure")) {
      dispatch(deleteMeal(id));
    } */
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
        dispatch(deleteMeal(id));
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Meal ID",
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
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <Typography>
              {params.row.countInStock <= 0
                ? "out of stock"
                : params.row.countInStock}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filter: false,
      valueGetter: (params) => params.row._id,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <IconButton
              onClick={() => history.push(`meals/${params.row._id}/edit`)}
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

  // render/re render meal list
  useEffect(() => {
    dispatch(getMealList());

    if (deleteSuccess) {
      setIsSnackbar(true);
    }
  }, [dispatch, deleteSuccess]);

  if (mealsLoading) return <Loader />;

  return (
    <Container>
      <Snackbar
        open={isSnackbar}
        autoHideDuration={6000}
        onClose={() => setIsSnackbar(false)}
      >
        <Alert
          onClose={() => setIsSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Meal successfuly deleted
        </Alert>
      </Snackbar>

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
          disabled={userInfo.role !== "admin"}
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
