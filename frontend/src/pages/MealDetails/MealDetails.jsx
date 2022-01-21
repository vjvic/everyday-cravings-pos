import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMealDetails,
  creatMealReview,
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
  /*  FormControl,
  Select,
  MenuItem,
  InputLabel, */
  TextField,
  Rating,
  IconButton,
  Stack,
  Container,
  Pagination,
} from "@mui/material";
import { useHistory } from "react-router";
import { Loader } from "../../components";
import { MEAL_CREATE_REVIEW_RESET } from "../../redux/constants/mealConstants";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MealDetailsPage = () => {
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mealReviewPerpage] = useState(5);

  const dispatch = useDispatch();
  const { meal, loading, error } = useSelector((state) => state.mealDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: errorReviews, success: successReviews } = useSelector(
    (state) => state.mealCreateReviews
  );

  const indexOfLastMealReview = currentPage * mealReviewPerpage;
  const indexOfFirstMealReview = indexOfLastMealReview - mealReviewPerpage;
  const currentMealReview = meal.reviews.slice(
    indexOfFirstMealReview,
    indexOfLastMealReview
  );

  //change page

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const { name, image, countInStock, price } = meal;

  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const history = useHistory();

  const handleReview = (e) => {
    e.preventDefault();
    console.log(reviewRating, comment);
    dispatch(
      creatMealReview(id, {
        comment,
        rating: reviewRating,
      })
    );
  };

  useEffect(() => {
    dispatch(getMealDetails(id));
    dispatch({ type: MEAL_CREATE_REVIEW_RESET });
  }, [dispatch, id, successReviews]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  /*   const inStock = (
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
  ); */

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

            <Stack direction="row" alignItems="center" pb={1} spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={meal.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2">{meal.numReviews} reviews</Typography>
            </Stack>

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
                  onClick={() => history.push(`/cart/${id}?qty=${qty}`)}
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={12} lg={4}>
          <Box mb={2}>
            <Typography variant="h4" sx={{ paddingBottom: 2 }}>
              Reviews
            </Typography>
            {currentMealReview.length === 0 && (
              <Alert severity="info">No Reviews</Alert>
            )}
            <Box as="ul" sx={{ listStyle: "none", padding: 0 }}>
              {currentMealReview.map((review) => (
                <Box as="li" my={2} key={review._id}>
                  <Box display="flex" alignItems="center">
                    <strong>{review.name}</strong>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                  <Typography variant="body2">
                    {review.createdAt.substring(0, 10)}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body"
                    sx={{ paddingTop: 1 }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              ))}
              {meal.reviews.length > 5 && (
                <Pagination
                  count={Math.ceil(meal.reviews.length / mealReviewPerpage)}
                  onChange={handleChangePage}
                />
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" sx={{ paddingBottom: 1 }}>
              Write a Review
            </Typography>

            {errorReviews && <Alert severity="error">{errorReviews}</Alert>}

            {userInfo ? (
              <form onSubmit={handleReview}>
                <Rating
                  value={reviewRating || 0}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setReviewRating(newValue);
                  }}
                />
                <div>
                  <TextField
                    label="Write a review"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={3}
                    value={comment || ""}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Submit
                </Button>
              </form>
            ) : (
              <Alert severity="info">
                Please <Link to="/login">signin </Link> to write a review
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealDetailsPage;
