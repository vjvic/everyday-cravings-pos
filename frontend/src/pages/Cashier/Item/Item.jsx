import { Box, Typography, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem, CartItemImg, CartItemContent } from "./styles";

const Item = ({ item }) => {
  const { image, name, price, countInStock, qty } = item;

  return (
    <CartItem>
      <CartItemImg component="img" image={image} alt={name} />

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
            <IconButton disabled={qty === 0}>
              <RemoveIcon />
            </IconButton>

            <div>{qty}</div>

            <IconButton variant="contained" disabled={qty >= countInStock}>
              <AddIcon />
            </IconButton>
          </Stack>
        )}
      </CartItemContent>
    </CartItem>
  );
};

export default Item;
