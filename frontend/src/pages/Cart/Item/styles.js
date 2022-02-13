import { styled } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";

export const CartItem = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const CartItemImg = styled(CardMedia)(({ theme }) => ({
  maxWidth: "250px",
  height: "120px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    height: "100%",
  },
}));

export const CartItemContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));
