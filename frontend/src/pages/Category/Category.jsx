import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  Button,
  Stack,
  Container,
  capitalize,
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
  getCategoryList,
  deleteCategory,
} from "../../redux/actions/categoryAction";
import { Loader } from "../../components";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ displayPrint: "none" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const Category = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, category } = useSelector((state) => state.categoryList);
  const { success: deleteSuccess } = useSelector(
    (state) => state.categoryDelete
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  //Delete Meal
  const handleDelete = (id) => {
    /*   if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id));
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
        dispatch(deleteCategory(id));
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Category ID",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{capitalize(params.row.category)}</div>;
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
              onClick={() => history.push(`categories/${params.row._id}/edit`)}
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

  useEffect(() => {
    dispatch(getCategoryList());
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
          Categories
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => history.push("/categories/edit")}
          disabled={userInfo.role !== "admin"}
        >
          Add Category
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={category}
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

export default Category;
