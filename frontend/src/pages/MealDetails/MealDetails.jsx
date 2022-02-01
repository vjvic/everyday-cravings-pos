import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMealDetails,
  /*   creatMealReview, */
} from "../../redux/actions/mealAction";
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
  IconButton,
  Stack,
  Container,
} from "@mui/material";
import { useHistory } from "react-router";
import { Loader } from "../../components";
import { MEAL_CREATE_REVIEW_RESET } from "../../redux/constants/mealConstants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FaCashRegister } from "react-icons/fa";

const MealDetailsPage = () => {
  const dispatch = useDispatch();
  const { meal, loading, error } = useSelector((state) => state.mealDetails);

  const { name, image, countInStock, price } = meal;

  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMealDetails(id));
    dispatch({ type: MEAL_CREATE_REVIEW_RESET });
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="xl">
      <Box mb={3}>
        <Button color="inherit" onClick={() => history.push("/")}>
          Go Back
        </Button>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} lg={5}>
          <div>
            <img
              src={image}
              alt={name}
              style={{
                borderRadius: "10px",
                maxHeight: "400px",
                objectFit: "cover",
              }}
              width="100%"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} lg={3}>
          <Box
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
          >
            <Typography variant="h4" component="h3">
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

              {/* {countInStock > 0 && inStock} */}

              {countInStock > 0 && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>Quantity:</Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton
                      onClick={() => setQty(qty - 1)}
                      disabled={qty === 1}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <div>{qty}</div>

                    <IconButton
                      variant="contained"
                      onClick={() => setQty(qty + 1)}
                      disabled={qty === countInStock}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              )}

              <Box mt={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => history.push(`/cashier/${id}?qty=${qty}`)}
                  disabled={countInStock === 0}
                  startIcon={<FaCashRegister />}
                >
                  Add to Cashier
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealDetailsPage;
