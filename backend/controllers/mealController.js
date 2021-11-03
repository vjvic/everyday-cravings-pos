import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel.js";

//@desc Fetch all meals
//@route GET /api/meals
//@access Public
const getMeal = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});

  res.json(meals);
});

//@desc Fetch meal by id
//@route GET /api/meals/:id
//@access Public
const getMealById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    res.json(meal);
  } else {
    res.status(404);
    throw new Error("Meal not found");
  }
});

export { getMeal, getMealById };
