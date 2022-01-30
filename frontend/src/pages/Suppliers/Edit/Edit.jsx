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
} from "@mui/material";
import { Box } from "@mui/system";
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
      dispatch({ type: SUPPLIER_CREATE_RESET });
      dispatch({ type: SUPPLIER_UPDATE_RESET });
    }
  }, [createSuccess, updateSuccess, history, dispatch]);

  if (supplierLoading) return <Loader />;

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
          {isEdit ? "Edit Supplier" : "Add Supplier"}
        </Typography>
        <Divider />

        {updateError ||
          (supplierCreateError && (
            <Alert severity="error">{updateError || supplierCreateError}</Alert>
          ))}
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
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/*   <Stack direction="row" spacing={2}>
          <TextField
            label="qty"
            variant="outlined"
            value={qty || ""}
            type="number"
            onChange={(e) => setQty(e.target.value)}
            fullWidth
          />

         
        </Stack> */}

        {/*   <Stack direction="row" spacing={2}> */}
        {/*    <FormControl fullWidth>
            <InputLabel>Supplier</InputLabel>
            <Select
              defaultValue={supplier || ""}
              value={supplier || ""}
              label="Supplier"
              onChange={(e) => setSupplier(e.target.value)}
            >
              {supplierList.map((c, index) => (
                <MenuItem key={index} value={c.name.toLowerCase()}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

        {/* <TextField
            label="Cost"
            variant="outlined"
            value={cost || ""}
            onChange={(e) => setCost(e.target.value)}
            fullWidth
          />
        </Stack> */}

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
      </Box>
    </Container>
  );
};

export default Edit;
