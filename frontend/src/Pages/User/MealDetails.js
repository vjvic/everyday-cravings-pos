import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMealDetails } from "redux/actions/mealAction";
import { useParams } from "react-router";

const MealDetails = () => {
  const dispatch = useDispatch();
  const { meal, loading, error } = useSelector((state) => state.mealDetails);

  const { id } = useParams();

  console.log(meal);

  useEffect(() => {
    dispatch(getMealDetails(id));
  }, [dispatch, id]);

  return <div>Meal Details</div>;
};

export default MealDetails;
