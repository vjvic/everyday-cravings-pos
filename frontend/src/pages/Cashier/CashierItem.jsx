import React from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  /*   Alert,
  Button,
  Divider,
  Modal,
  TextField,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Paper,
  Card, */
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartAction";
import { useEffect } from "react";

const CashierItem = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.qty <= 0 || item.countInStock <= 0) {
      dispatch(removeFromCart(item.meal));
    }
  }, [dispatch, item]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gridGap: "0.5rem",
        boxShadow: "0 0 1px rgba(0,0,0,0.5)",
        marginY: 2,
        marginX: 1,
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "90px",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Grid container spacing={2}>
        <Grid item lg={6}>
          <div>{item.name}</div>
          <div>
            <Typography variant="body">
              &#8369; {item.price.toFixed(2)}
            </Typography>
          </div>
        </Grid>

        <Grid item lg={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {item.qty === 1 ? (
              <IconButton onClick={() => dispatch(removeFromCart(item.meal))}>
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => dispatch(addToCart(item.meal, item.qty - 1))}
              >
                <RemoveIcon />
              </IconButton>
            )}
            <div>{item.qty}</div>
            <IconButton
              onClick={() => dispatch(addToCart(item.meal, item.qty + 1))}
              disabled={item.qty > item.countInStock}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CashierItem;
