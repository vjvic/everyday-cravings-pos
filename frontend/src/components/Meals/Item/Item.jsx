import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
/* import { Link } from "react-router-dom"; */
/* import { useHistory } from "react-router"; */
import { addToCart } from "../../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const fontSize = {
  lg: 20,
  md: 18,
  sm: 18,
  xs: 18,
};

const Item = ({ item, favorite }) => {
  const { name, image, category, price, _id, countInStock, description } = item;

  /*  const history = useHistory(); */

  const dispatch = useDispatch();

  return (
    <Tooltip title={description}>
      <Card>
        <CardHeader
          sx={{
            display: "block",
            overflow: "hidden",
            textTransform: "capitalize",
          }}
          title={
            <Typography
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

        <CardMedia component="img" height="120" image={image} alt={name} />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 1,
              flexWrap: "no-wrap",
            }}
          >
            {countInStock <= 0 ? (
              <Typography variant="h6" sx={{ color: "red" }}>
                Out of stock
              </Typography>
            ) : (
              <div>
                <Typography sx={{ fontSize }} variant="h5" noWrap>
                  &#8369; {price.toFixed(2)}
                </Typography>
              </div>
            )}

            <Button
              variant="contained"
              onClick={() => dispatch(addToCart(_id, 1))}
              disabled={countInStock <= 0}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default Item;
