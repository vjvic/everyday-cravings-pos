import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Typography,
  TextField,
  Button,
  /*  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack, */
  Alert,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import {
  createCategory,
  getCategoryDetails,
  updateCategory,
} from "../../../redux/actions/categoryAction";
import { useHistory } from "react-router-dom";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_RESET,
} from "../../../redux/constants/categoryConstants";
import { uniqueID } from "../../../utils/utils";

const Edit = () => {
  const [categoryName, setCategoryName] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let isEdit = id ? true : false;

  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.categoryDetails);

  const {
    loading: categoryCreateLoading,
    success: createSuccess,
    error: categoryCreateError,
  } = useSelector((state) => state.categoryCreate);

  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.categoryUpdate);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        updateCategory({
          _id: category._id,
          category: categoryName.toLowerCase(),
        })
      );
    } else {
      dispatch(
        createCategory({ category: categoryName.toLowerCase(), id: uniqueID() })
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getCategoryDetails(id));
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (category && isEdit) {
      setCategoryName(category.category);
    }
  }, [dispatch, id, isEdit, category]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      history.push("/categories");
      dispatch({ type: CATEGORY_CREATE_RESET });
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }
  }, [createSuccess, updateSuccess, history, dispatch]);

  if (categoryLoading) return <Loader />;

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
          {isEdit ? "Edit Category" : "Add Category"}
        </Typography>
        <Divider />

        {updateError ||
          (categoryCreateError && (
            <Alert severity="error">{updateError || categoryCreateError}</Alert>
          ))}
        {categoryError && <Alert severity="error">{categoryError}</Alert>}

        <TextField
          label="Category Name"
          variant="outlined"
          value={categoryName || ""}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
        />

        {/*         <Stack direction="row" spacing={2}>
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
 */}
        {/*   <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
 */}
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
          fullWidth
          disabled={updateLoading || categoryCreateLoading}
        >
          {isEdit ? "UPDATE" : "ADD"}
        </Button>
      </Box>
    </Container>
  );
};

export default Edit;
