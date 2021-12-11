import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Grid,
  Alert,
  Card,
  CardContent,
  Button,
  Divider,
  Modal,
  TextField,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams, useLocation /* useHistory  */ } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { Link } from "react-router-dom";
import Item from "./item";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const CreateOrder = () => {
  const { id } = useParams();
  const location = useLocation();
  /*   const history = useHistory(); */
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();

  //Item quantity
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const noCart = (
    <Alert severity="info">
      No item{" "}
      <Typography
        variant="body2"
        color="inherit"
        component={Link}
        to="/admin/menu"
      >
        Go to Menu
      </Typography>
    </Alert>
  );

  const cartItemsList = (
    <>
      {cartItems.map((item) => (
        <Item item={item} key={item.meal} />
      ))}
    </>
  );

  return (
    <>
      <Modal
        open={isSave}
        onClose={() => setIsSave(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isSave}>
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              Payment
            </Typography>

            <Typography variant="body" component="p" sx={{ marginTop: 2 }}>
              <strong>Total Amount: </strong>
              <span>100</span>
            </Typography>
            <Typography variant="body" omponent="p">
              <strong>Total Change: </strong>
              <span>20</span>
            </Typography>

            {/* 
        {updateError && <Alert severity="error">{updateError}</Alert>}
        {mealError && <Alert severity="error">{mealError}</Alert>} */}

            {/* {mealLoading ? (
          "loading..."
        ) : ( */}
            <Box
              component="form"
              mt={3}
              sx={{
                "& > :not(style)": { my: 1, width: "100%" },
              }}
              /* onSubmit={handleEditSubmit} */
            >
              <TextField
                label="Customer Name"
                variant="outlined"
                color="secondary"
                /* value={name || ""} */
                /*  onChange={(e) => setName(e.target.value)} */
              />

              <TextField
                label="Paid"
                type="number"
                variant="outlined"
                color="secondary"
                /* value={name || ""} */
                /*  onChange={(e) => setName(e.target.value)} */
              />

              <FormControl fullWidth color="secondary">
                <InputLabel>Payment Type</InputLabel>
                <Select
                  /*  defaultValue={category || ""}
                    value={category || ""} */
                  label="Payment Type"
                  /* onChange={(e) => setCategory(e.target.value)} */
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="credit-card">Credit Card</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ height: "45px" }}
              >
                Save payment
              </Button>
            </Box>
            {/*   )} */}
          </Box>
        </Fade>
      </Modal>
      <div>
        <Box mb={5}>
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
            Create Order
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item sm={12} md={7} lg={7}>
            {cartItems <= 0 ? noCart : cartItemsList}
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Card>
              <CardContent>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ paddingBottom: 2 }}
                >
                  Total ({cartItems.length}) Items
                </Typography>

                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ paddingBottom: 2 }}
                >
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </Typography>

                <Typography variant="body1">
                  &#8369;
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>

                <Divider />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ marginTop: 3 }}
                  disabled={cartItems.length === 0}
                  onClick={() => setIsSave(true)}
                >
                  Payment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CreateOrder;
