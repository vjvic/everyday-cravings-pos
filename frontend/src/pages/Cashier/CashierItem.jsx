import { Box } from "@mui/system";
import { Typography, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import {
  addToCashier,
  removeFromCashier,
} from "../../redux/actions/cashierAction";
import { useEffect } from "react";

const style = {
  display: "flex",
  alignItems: "center",
  gridGap: "0.5rem",
  boxShadow: "0 0 1px rgba(0,0,0,0.5)",
  marginY: 2,
  marginX: 1,
};

const imgStyle = {
  width: "90px",
  height: "100%",
  objectFit: "cover",
};

const CashierItem = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.qty <= 0 || item.countInStock <= 0) {
      dispatch(removeFromCashier(item.meal));
    }
  }, [dispatch, item]);

  return (
    <Box sx={style}>
      <img src={item.image} alt={item.name} style={imgStyle} />

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
            <IconButton
              onClick={() => dispatch(addToCashier(item.meal, item.qty - 1))}
            >
              <RemoveIcon />
            </IconButton>

            <div>{item.qty}</div>
            <IconButton
              onClick={() => dispatch(addToCashier(item.meal, item.qty + 1))}
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
