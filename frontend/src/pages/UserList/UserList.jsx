import { useEffect } from "react";
import {
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
  capitalize,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { deleteUser, listUsers } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ displayPrint: "none" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const UserListPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);
  const { success: deleteSuccess } = useSelector((state) => state.userDelete);
  const { userInfo } = useSelector((state) => state.userLogin);

  //Delete user
  const handleDelete = (id) => {
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
        dispatch(deleteUser(id));
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "User ID",
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
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.role && capitalize(params.row.role)}
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
              onClick={() => history.push(`user-list/${params.row._id}/edit`)}
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
          Users
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => history.push("user-list/edit")}
          disabled={userInfo.role !== "admin"}
        >
          Add User
        </Button>
      </Stack>

      <div
        style={{
          height: 500,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
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
