import React from "react";
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

const Category = () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
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

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 3 }}
      >
        <Typography variant="h4" component="h1">
          Category
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          /* onClick={() => history.push("meals/edit")} */
        >
          Add Category
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={[
            { id: 1, name: "Breakfast" },
            { id: 2, name: "Lunch" },
            { id: 3, name: "Dinner" },
          ]}
          columns={columns}
          getRowId={(row) => row.id}
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
