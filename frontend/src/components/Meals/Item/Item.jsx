import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { addToCart } from "../../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const Item = ({ item, favorite }) => {
  const { name, image, category, price, _id, countInStock } = item;

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader
        sx={{
          display: "block",
          overflow: "hidden",
          textTransform: "capitalize",
        }}
        title={
          <Typography
            component={Link}
            to={`/meal/${_id}`}
            color="inherit"
            noWrap
            variant="h6"
            sx={{ textDecoration: "none" }}
          >
            {name}
          </Typography>
        }
        subheader={category}
      />

      <CardMedia
        component="img"
        height="120"
        image={image}
        alt={name}
        sx={{ cursor: "pointer" }}
        onClick={() => dispatch(addToCart(_id, 1))}
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {countInStock <= 0 ? (
            <Typography variant="h6" sx={{ color: "red" }}>
              Out of stock
            </Typography>
          ) : (
            <Typography variant="h5">&#8369; {price.toFixed(2)}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
