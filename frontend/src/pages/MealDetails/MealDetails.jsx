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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Rating,
} from "@mui/material";
import { useHistory } from "react-router";
import { Loader } from "../../components";
import { MEAL_CREATE_REVIEW_RESET } from "../../redux/constants/mealConstants";
import { Link } from "react-router-dom";

const MealDetailsPage = () => {
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { meal, loading, error } = useSelector((state) => state.mealDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: errorReviews, success: successReviews } = useSelector(
    (state) => state.mealCreateReviews
  );

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
              style={{
                borderRadius: "10px",
                maxHeight: "400px",
                objectFit: "cover",
              }}
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

      <Grid container sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={12} lg={4}>
          <Box mb={2}>
            <Typography variant="h4" sx={{ paddingBottom: 2 }}>
              Reviews
            </Typography>
            {meal.reviews.length === 0 && (
              <Alert severity="info">No Reviews</Alert>
            )}
            <Box as="ul" sx={{ listStyle: "none", padding: 0 }}>
              {meal.reviews.map((review) => (
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
    </div>
  );
};

export default MealDetailsPage;
