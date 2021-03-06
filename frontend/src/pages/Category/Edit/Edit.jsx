import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Paper,
} from "@mui/material";
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
        createCategory({
          category: categoryName.toLowerCase(),
          id: "CA" + uniqueID(),
        })
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
    }

    return () => {
      dispatch({ type: CATEGORY_CREATE_RESET });
      dispatch({ type: CATEGORY_UPDATE_RESET });
    };
  }, [createSuccess, updateSuccess, history, dispatch]);

  if (categoryLoading) return <Loader />;

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        component="form"
        sx={{
          "& > :not(style)": { my: 1 },
          padding: 2,
        }}
        onSubmit={handleEditSubmit}
      >
        <Typography variant="h4">
          {" "}
          {isEdit ? "Edit Category" : "Add Category"}
        </Typography>
        <Divider />

        {updateError && (
          <Alert severity="error">Failed to update category</Alert>
        )}
        {categoryCreateError && (
          <Alert severity="error">Failed to create category</Alert>
        )}
        {categoryError && <Alert severity="error">Failed to fetch data</Alert>}

        <TextField
          label="Category Name"
          variant="outlined"
          value={categoryName || ""}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
        />

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
      </Paper>
    </Container>
  );
};

export default Edit;
