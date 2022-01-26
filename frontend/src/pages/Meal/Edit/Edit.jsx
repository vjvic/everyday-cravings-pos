import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  Alert,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import {
  createMeal,
  getMealDetails,
  updateMeal,
} from "../../../redux/actions/mealAction";
import { useHistory } from "react-router-dom";
import {
  MEAL_CREATE_RESET,
  MEAL_UPDATE_RESET,
} from "../../../redux/constants/mealConstants";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInstock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let isEdit = id ? true : false;

  const {
    meal,
    loading: mealLoading,
    error: mealError,
  } = useSelector((state) => state.mealDetails);

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

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
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
    } else {
      dispatch(
        createMeal(name, price, image, category, countInStock, description)
      );
    }
  };

  const types = ["image/jpeg", "image/png"];

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bphf8igw");

    if (file && types.includes(file.type)) {
      setUploading(true);
      setUploadError(false);

      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/domxafmfs/image/upload",
          formData
        );
        setImage(data.secure_url);
        setUploading(false);
      } catch {
        setUploading(false);
      }
    } else {
      setUploadError("please add an image (jpeg or png)");
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getMealDetails(id));
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (meal && isEdit) {
      setName(meal.name);
      setPrice(meal.price);
      setImage(meal.image);
      setCategory(meal.category);
      setCountInstock(meal.countInStock);
      setDescription(meal.description);
    }
  }, [dispatch, id, isEdit, meal]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      history.push("/admin/meals");
      dispatch({ type: MEAL_CREATE_RESET });
      dispatch({ type: MEAL_UPDATE_RESET });
    }
  }, [createSuccess, updateSuccess, history, dispatch]);

  if (mealLoading) return <Loader />;

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        mt={3}
        sx={{
          "& > :not(style)": { my: 1 },
        }}
        onSubmit={handleEditSubmit}
      >
        <Typography variant="h4">
          {" "}
          {isEdit ? "Edit Meal" : "Add Meal"}
        </Typography>
        <Divider />

        {updateError ||
          (mealCreateError && (
            <Alert severity="error">{updateError || mealCreateError}</Alert>
          ))}
        {mealError && <Alert severity="error">{mealError}</Alert>}
        {uploadError && <Alert severity="error">{uploadError}</Alert>}

        <TextField
          label="Meal Name"
          variant="outlined"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />

        <TextField
          label="Image"
          variant="outlined"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          component="label"
          disabled={uploading}
          startIcon={<FileUploadIcon />}
        >
          Upload File
          <input type="file" hidden onChange={uploadFileHandler} />
        </Button>

        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              defaultValue={category || ""}
              value={category || ""}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks"].map(
                (c, index) => (
                  <MenuItem key={index} value={c.toLowerCase()}>
                    {c}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <TextField
            label="Count In Stock"
            variant="outlined"
            type="number"
            value={countInStock || ""}
            onChange={(e) => setCountInstock(e.target.value)}
            fullWidth
          />
        </Stack>

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
          fullWidth
          disabled={updateLoading || mealCreateLoading}
        >
          {isEdit ? "UPDATE" : "ADD"}
        </Button>
      </Box>
    </Container>
  );
};

export default Edit;
