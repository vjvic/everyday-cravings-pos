import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem, CartItemImg, CartItemContent } from "./styles";

const Item = ({ item }) => {
  const { image, name, price, countInStock, meal, qty } = item;

  const dispatch = useDispatch();

  useEffect(() => {
    if (qty === 0 || countInStock === 0) {
      dispatch(removeFromCart(meal));
    }
  }, [dispatch, qty, meal, countInStock]);

  return (
    <CartItem>
      <CartItemImg
        component="img"
        /* sx={{ width: 151, height: 100 }} */
        image={image}
        alt={name}
      />

      <CartItemContent>
        <div>
          <Typography component="h3" variant="h5">
            {name}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" component="div">
            &#8369; {price}
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        {countInStock === 0 && (
          <Typography sx={{ color: "red" }}>out of stock</Typography>
        )}
        {countInStock > 0 && (
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => dispatch(addToCart(meal, qty - 1))}
              disabled={qty === 0}
            >
              <RemoveIcon />
            </IconButton>

            <div>{qty}</div>

            <IconButton
              variant="contained"
              onClick={() => dispatch(addToCart(meal, qty + 1))}
              disabled={qty >= countInStock}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        )}
      </CartItemContent>
    </CartItem>
  );
};

export default Item;
