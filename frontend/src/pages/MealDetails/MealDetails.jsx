import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMealDetails } from "../../redux/actions/mealAction";
import { useParams } from "react-router";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useHistory } from "react-router";
import { Loader } from "../../components";

const MealDetailsPage = () => {
  const dispatch = useDispatch();
  const { meal, loading, error } = useSelector((state) => state.mealDetails);

  const { name, image, countInStock, price } = meal;

  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMealDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  const inStock = (
    <>
      <Divider sx={{ marginY: 1 }} />
      <FormControl fullWidth color="secondary">
        <InputLabel>Quantity</InputLabel>
        <Select
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          label="Quantity"
        >
          {[...Array(countInStock).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <div>
      <Box mb={3}>
        <Button color="inherit" onClick={() => history.push("/")}>
          Go Back
        </Button>
      </Box>

      <Grid container spacing={5}>
        <Grid item sm={12} lg={6}>
          <div>
            <img
              src={image}
              alt={name}
              style={{ borderRadius: "10px" }}
              width="100%"
            />
          </div>
        </Grid>

        <Grid item sm={12} lg={3}>
          <Box
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
          >
            <Typography variant="h3" component="h3">
              {name}
            </Typography>

            <Divider />

            <Typography variant="body">Price: &#8369; {price}</Typography>

            <Divider />

            <Typography variant="body">
              Description: {meal.description}
            </Typography>
          </Box>
        </Grid>

        <Grid item sm={12} lg={3} sx={{ flexGrow: 1 }}>
          <Card
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
          >
            <CardContent>
              <Typography variant="body">
                Pirce: &#8369; {meal.price}
              </Typography>

              <Divider sx={{ marginY: 1 }} />

              <Typography variant="body" component="p">
                Status:{" "}
                {meal.countInStock > 0 ? (
                  <span style={{ color: "green" }}>In stock</span>
                ) : (
                  <span style={{ color: "red" }}>Out of stock</span>
                )}
              </Typography>

              {countInStock > 0 && inStock}

              <Box mt={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() =>
                    history.push(`/admin/cashier/${id}?qty=${qty}`)
                  }
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MealDetailsPage;
