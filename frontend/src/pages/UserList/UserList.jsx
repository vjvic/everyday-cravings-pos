import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser, listUsers } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components";
import AddIcon from "@mui/icons-material/Add";
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

const UserListPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);
  const { success: deleteSuccess } = useSelector((state) => state.userDelete);

  //Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isAdmin ? <CheckIcon /> : <CloseIcon />}
          </div>
        );
      },
    },
    {
      field: "isCashier",
      headerName: "Cashier",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isCashier ? <CheckIcon /> : <CloseIcon />}
          </div>
        );
      },
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
              onClick={() => history.push(`user-list/${params.row._id}/edit`)}
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

  // render/re render user list
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, deleteSuccess]);

  console.log(loading);

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
          User
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          /* onClick={() => history.push("meals/edit")} */
        >
          Add User
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
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

export default UserListPage;
