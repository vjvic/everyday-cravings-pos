import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { CircularProgress, Alert } from "@mui/material";
import { getMealList } from "../../redux/actions/mealAction";

const Menu = () => {
  const { loading, meals, error } = useSelector((state) => state.mealList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealList());
  }, [dispatch]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <MenuItem meals={meals} />
    </div>
  );
};

export default Menu;
