import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Rating,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";

import FavoriteIcon from "@mui/icons-material/Favorite";

const Item = ({ item, favorite }) => {
  const { name, image, category, price, rating, numReviews } = item;

  return (
    <Card>
      <CardHeader
        sx={{
          display: "block",
          overflow: "hidden",
          textTransform: "capitalize",
        }}
        title={
          <Typography noWrap variant="h5">
            {name}
          </Typography>
        }
        subheader={category}
      />

      <CardMedia component="img" height="194" image={image} alt={name} />

      <CardContent>
        <Stack direction="row" alignItems="center" pb={1} spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2">{numReviews} reviews</Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Typography variant="h5">&#8369; {price}</Typography>
          <IconButton>
            <FavoriteIcon sx={{ color: favorite ? "primary.main" : "" }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
