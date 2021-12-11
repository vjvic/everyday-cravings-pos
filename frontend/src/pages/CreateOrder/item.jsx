import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartAction";

const Item = ({ item }) => {
  const { image, name, price, countInStock, meal, qty } = item;

  const dispatch = useDispatch();

  return (
    <Card sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
      <CardMedia component="img" sx={{ width: 151 }} image={image} alt={name} />

      <CardContent>
        <Typography component="h3" variant="h5">
          {name}
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" component="div">
          &#8369; {price}
        </Typography>
      </CardContent>
      <Box sx={{ flex: 1 }} />
      <FormControl sx={{ marginX: 2 }} color="secondary">
        <InputLabel>Qty</InputLabel>
        <Select
          value={qty}
          onChange={(e) => dispatch(addToCart(meal, Number(e.target.value)))}
          label="Qty"
        >
          {[...Array(countInStock).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        sx={{ marginRight: 2 }}
        onClick={() => dispatch(removeFromCart(meal))}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default Item;
