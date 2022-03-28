import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { addToCashier } from "../../../redux/actions/cashierAction";
import { useDispatch } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";

const fontSize = {
  lg: 20,
  md: 18,
  sm: 18,
  xs: 18,
};

const cardHeaderStyle = {
  display: "block",
  overflow: "hidden",
  textTransform: "capitalize",
};

const cardContentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 1,
  flexWrap: "no-wrap",
};

const Item = ({ item }) => {
  const { name, image, category, price, _id, countInStock, description } = item;

  const dispatch = useDispatch();

  return (
    <Tooltip title={description}>
      <Card>
        <CardHeader
          sx={cardHeaderStyle}
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
          <Box sx={cardContentStyle}>
            {countInStock <= 0 ? (
              <Typography variant="h6" sx={{ color: "red" }}>
                Out of stock
              </Typography>
            ) : (
              <Typography sx={{ fontSize }} variant="h5" noWrap>
                &#8369; {price.toFixed(2)}
              </Typography>
            )}

            {countInStock <= 0 ? (
              ""
            ) : (
              <IconButton
                variant="contained"
                onClick={() => dispatch(addToCashier(_id, 1))}
                disabled={countInStock <= 0}
              >
                <MdAddShoppingCart />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default Item;
