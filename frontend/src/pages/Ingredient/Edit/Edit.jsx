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
  FormControlLabel,
  Checkbox,
  capitalize,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import {
  createIngredient,
  getIngredientDetails,
  updateIngredient,
} from "../../../redux/actions/ingredientAction";
import { getSupplierList } from "../../../redux/actions/supplierAction";
import { useHistory } from "react-router-dom";
import {
  INGREDIENT_CREATE_RESET,
  INGREDIENT_UPDATE_RESET,
} from "../../../redux/constants/ingredientConstants";
import { uniqueID } from "../../../utils/utils";

const Edit = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState();
  const [supplier, setSupplier] = useState("");
  const [measure, setMeasure] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [cost, setCost] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let isEdit = id ? true : false;

  const {
    ingredient,
    loading: ingredientLoading,
    error: ingredientError,
  } = useSelector((state) => state.ingredientDetails);
  //supplier
  const { supplier: supplierList } = useSelector((state) => state.supplierList);

  const {
    loading: ingredientCreateLoading,
    success: createSuccess,
    error: ingredientCreateError,
  } = useSelector((state) => state.ingredientCreate);

  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.ingredientUpdate);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        updateIngredient({
          _id: ingredient._id,
          name: name.toLowerCase(),
          qty: qty,
          supplier: supplier,
          measure: measure,
          cost: cost,
          isActive: isActive,
        })
      );
    } else {
      dispatch(
        createIngredient({
          id: "IN" + uniqueID(),
          name: name.toLowerCase(),
          qty: qty,
          supplier: supplier,
          measure: measure,
          cost: cost,
          isActive: isActive,
        })
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getIngredientDetails(id));
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (ingredient && isEdit) {
      setName(ingredient.name);
      setQty(ingredient.qty);
      setSupplier(ingredient.supplier);
      setMeasure(ingredient.measure);
      setCost(ingredient.cost);
      setIsActive(ingredient.isActive);
    }
  }, [dispatch, id, isEdit, ingredient]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      history.push("/ingredients");
      dispatch({ type: INGREDIENT_CREATE_RESET });
      dispatch({ type: INGREDIENT_UPDATE_RESET });
    }
  }, [createSuccess, updateSuccess, history, dispatch]);

  //supplier
  useEffect(() => {
    dispatch(getSupplierList());
  }, [dispatch]);

  if (ingredientLoading) return <Loader />;

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
          {isEdit ? "Edit Ingredient" : "Add Ingredient"}
        </Typography>
        <Divider />

        {updateError && (
          <Alert severity="error"> Failed to update ingredient </Alert>
        )}

        {ingredientCreateError && (
          <Alert severity="error"> Failed to create ingredient </Alert>
        )}

        {ingredientError && (
          <Alert severity="error">Failed to fetch data</Alert>
        )}

        <TextField
          label="Ingredient Name"
          variant="outlined"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="qty"
            variant="outlined"
            value={qty || ""}
            type="number"
            onChange={(e) => setQty(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>UOM(Unit of measure)</InputLabel>
            <Select
              defaultValue={measure || ""}
              value={measure || ""}
              label="UOM(Unit of measure)"
              onChange={(e) => setMeasure(e.target.value)}
            >
              {["item", "ounce", "cup"].map((c, index) => (
                <MenuItem key={index} value={c.toLowerCase()}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Supplier</InputLabel>
            <Select
              defaultValue={supplier || ""}
              value={supplier || ""}
              label="Supplier"
              onChange={(e) => setSupplier(e.target.value)}
            >
              {supplierList.map((c, index) => (
                <MenuItem key={index} value={c.name.toLowerCase()}>
                  {capitalize(c.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Cost"
            variant="outlined"
            value={cost || ""}
            onChange={(e) => setCost(e.target.value)}
            fullWidth
          />
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              checked={isActive || false}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Is Active"
        />

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{ height: "45px" }}
          fullWidth
          disabled={updateLoading || ingredientCreateLoading}
        >
          {isEdit ? "UPDATE" : "ADD"}
        </Button>
      </Box>
    </Container>
  );
};

export default Edit;
