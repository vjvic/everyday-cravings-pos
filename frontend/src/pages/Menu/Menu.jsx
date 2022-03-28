import { useEffect } from "react";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { getMealList } from "../../redux/actions/mealAction";
import { Loader } from "../../components";

const Menu = () => {
  const { loading, meals, error } = useSelector((state) => state.mealList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealList());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <MenuItem meals={meals} />
    </div>
  );
};

export default Menu;
