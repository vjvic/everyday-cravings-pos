import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  /* Rating,
  Stack, */
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Item = ({ item, favorite }) => {
  const { name, image, category, price, _id } = item;

  const history = useHistory();

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
            variant="h5"
            sx={{ textDecoration: "none" }}
          >
            {name}
          </Typography>
        }
        subheader={category}
      />

      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
        sx={{ cursor: "pointer" }}
        onClick={() => history.push(`/meal/${_id}`)}
      />

      <CardContent>
        {/*     <Stack direction="row" alignItems="center" pb={1} spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2">{numReviews} reviews</Typography>
        </Stack>
 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Typography variant="h5">&#8369; {price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
