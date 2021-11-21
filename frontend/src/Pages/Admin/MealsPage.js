import React, { useState, useEffect } from "react";
import {
  Paper,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Typography,
  TableHead,
  CircularProgress,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Button,
  Alert,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getMealList } from "../../redux/actions/mealAction";
import AddIcon from "@mui/icons-material/Add";
import {
  deleteMeal,
  createMeal,
  getMealDetails,
  updateMeal,
} from "../../redux/actions/mealAction";
import mealApi from "../../components/api/mealApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const MealsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInstock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { meals, loading: mealsLoading } = useSelector(
    (state) => state.mealList
  );

  const {
    meal,
    loading: mealLoading,
    error: mealError,
  } = useSelector((state) => state.mealDetails);

  const { success: deleteSuccess } = useSelector((state) => state.mealDelete);
  const {
    loading: mealCreateLoading,
    success: createSuccess,
    error: mealCreateError,
  } = useSelector((state) => state.mealCreate);

  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.mealUpdate);

  //Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Delete Meal
  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteMeal(id));
    }
  };

  //Create Meal
  const handleCreateMeal = () => {
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setCountInstock("");
    setDescription("");
    setIsCreate(true);
  };

  //Edit user
  const handleEdit = (id) => {
    setIsEdit(true);
    dispatch(getMealDetails(id));
  };

  //Edit meal submit

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateMeal({
        _id: meal._id,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );

    setIsEdit(false);
  };

  //Create meal submit

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createMeal(name, price, image, category, countInStock, description)
    );

    setIsCreate(false);
  };

  //Upload file handler

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    console.log(file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await mealApi.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // render/re render meal list
  useEffect(() => {
    dispatch(getMealList());
  }, [dispatch, deleteSuccess, updateSuccess, createSuccess]);

  useEffect(() => {
    if (meal) {
      setName(meal.name);
      setPrice(meal.price);
      setImage(meal.image);
      setCategory(meal.category);
      setCountInstock(meal.countInStock);
      setDescription(meal.description);
    }
  }, [dispatch, meal]);

  if (mealsLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      {/*   Edit meal form */}
      <Modal
        open={isEdit}
        onClose={() => setIsEdit(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isEdit}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Edit Meal
            </Typography>

            {updateError && <Alert severity="error">{updateError}</Alert>}
            {mealError && <Alert severity="error">{mealError}</Alert>}

            {mealLoading ? (
              "loading..."
            ) : (
              <Box
                component="form"
                mt={3}
                sx={{
                  "& > :not(style)": { my: 1, width: "100%" },
                }}
                onSubmit={handleEditSubmit}
              >
                <TextField
                  label="Meal Name"
                  variant="outlined"
                  color="secondary"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  label="Price"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <TextField
                  label="Image"
                  variant="outlined"
                  color="secondary"
                  value={image || ""}
                  onChange={(e) => setImage(e.target.value)}
                />

                <Button
                  variant="contained"
                  component="label"
                  disabled={uploading}
                >
                  Upload File
                  <input type="file" hidden onChange={uploadFileHandler} />
                </Button>

                <FormControl fullWidth color="secondary">
                  <InputLabel>Category</InputLabel>
                  <Select
                    defaultValue={category || ""}
                    value={category || ""}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dessert">Dessert</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Count In Stock"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  value={countInStock || ""}
                  onChange={(e) => setCountInstock(e.target.value)}
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  color="secondary"
                  multiline
                  rows={3}
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ height: "45px" }}
                  disabled={updateLoading}
                >
                  UPDATE
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

      {/*  Create meal form */}
      <Modal
        open={isCreate}
        onClose={() => setIsCreate(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCreate}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Add Meal
            </Typography>
            {mealCreateError && (
              <Alert severity="error">{mealCreateError}</Alert>
            )}
            <Box
              component="form"
              mt={3}
              sx={{
                "& > :not(style)": { my: 1, width: "100%" },
              }}
              onSubmit={handleCreateSubmit}
            >
              <TextField
                label="Meal Name"
                variant="outlined"
                color="secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Price"
                variant="outlined"
                color="secondary"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <TextField
                label="Image"
                variant="outlined"
                color="secondary"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <Button
                variant="contained"
                component="label"
                disabled={uploading}
              >
                Upload File
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>

              <FormControl fullWidth color="secondary">
                <InputLabel>Category</InputLabel>
                <Select
                  defaultValue={category}
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="dessert">Dessert</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Count In Stock"
                variant="outlined"
                color="secondary"
                type="number"
                value={countInStock}
                onChange={(e) => setCountInstock(e.target.value)}
              />

              <TextField
                label="Description"
                variant="outlined"
                color="secondary"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ height: "45px" }}
                disabled={mealCreateLoading}
              >
                Add Meal
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Box sx={{ width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h1" sx={{ marginY: 5 }}>
            Meal List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateMeal}
          >
            Add Meal
          </Button>
        </Stack>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {["ID", "Meal Name", "Price", "Category"].map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {meals &&
                  meals
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover key={row._id}>
                          <TableCell></TableCell>
                          <TableCell component="th" id={labelId} scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>&#8369; {row.price}</TableCell>
                          <TableCell sx={{ textTransform: "Capitalize" }}>
                            {row.category}
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEdit(row._id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={meals && meals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default MealsPage;
