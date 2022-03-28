import { useState, useEffect } from "react";
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
  Alert,
  Container,
  FormControlLabel,
  Checkbox,
  capitalize,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import {
  createSupplier,
  getSupplierDetails,
  updateSupplier,
} from "../../../redux/actions/supplierAction";
import { useHistory } from "react-router-dom";
import {
  SUPPLIER_CREATE_RESET,
  SUPPLIER_UPDATE_RESET,
} from "../../../redux/constants/supplierConstants";
import { uniqueID } from "../../../utils/utils";

const Edit = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let isEdit = id ? true : false;

  const {
    supplier,
    loading: supplierLoading,
    error: supplierError,
  } = useSelector((state) => state.supplierDetails);

  const {
    loading: supplierCreateLoading,
    success: createSuccess,
    error: supplierCreateError,
  } = useSelector((state) => state.supplierCreate);

  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.supplierUpdate);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        updateSupplier({
          _id: supplier._id,
          name: name.toLowerCase(),
          contact: contact,
          address: address,
          type: type,
          isActive: isActive,
        })
      );
    } else {
      dispatch(
        createSupplier({
          id: "SU" + uniqueID(),
          name: name.toLowerCase(),
          contact: contact,
          address: address,
          type: type,
          isActive: isActive,
        })
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSupplierDetails(id));
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (supplier && isEdit) {
      setName(supplier.name);
      setContact(supplier.contact);
      setAddress(supplier.address);
      setType(supplier.Type);
      setIsActive(supplier.isActive);
    }
  }, [dispatch, id, isEdit, supplier]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      history.push("/suppliers");
    }

    return () => {
      dispatch({ type: SUPPLIER_CREATE_RESET });
      dispatch({ type: SUPPLIER_UPDATE_RESET });
    };
  }, [createSuccess, updateSuccess, history, dispatch]);

  if (supplierLoading) return <Loader />;

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
          {isEdit ? "Edit Supplier" : "Add Supplier"}
        </Typography>
        <Divider />

        {updateError && (
          <Alert severity="error">Failed to update supplier</Alert>
        )}
        {supplierCreateError && (
          <Alert severity="error">Failed to create supplier</Alert>
        )}
        {supplierError && <Alert severity="error">{supplierError}</Alert>}

        <TextField
          label="Supplier Name"
          variant="outlined"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Address"
          variant="outlined"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />

        <TextField
          label="Contact"
          variant="outlined"
          value={contact || ""}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            defaultValue={type || ""}
            value={type || ""}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            {["Retailer", "Wholesale", "Manufacturer"].map((c, index) => (
              <MenuItem key={index} value={c.toLowerCase()}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          disabled={updateLoading || supplierCreateLoading}
        >
          {isEdit ? "UPDATE" : "ADD"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Edit;
