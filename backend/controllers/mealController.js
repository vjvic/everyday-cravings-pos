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

//@desc Delete meal by id
//@route DELETE /api/meals/:id
//@access Private/Admin
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    await meal.remove();
    res.json({ message: "Meal removed" });
  } else {
    res.status(404);
    throw new Error("Meal not found");
  }
});

//@desc Create meal
//@route POST /api/meals
//@access Private/Admin
const createMeal = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const meal = await Meal.create({
    name,
    price,
    image,
    category,
    countInStock,
    numReviews,
    description,
  });

  if (meal) {
    res.json({
      name: meal.name,
      price: meal.price,
      user: req.user._id,
      image: meal.image,
      category: meal.category,
      countInStock: meal.countInStock,
      numReviews: meal.numReviews,
      description: meal.description,
    });
  } else {
    res.status(404);
    throw new Error("Meal not found");
  }
});

//@desc Update meal
//@route PUT /api/meals/:id
//@access Private/Admin
const updateMeal = asyncHandler(async (req, res) => {
  const { name, price, image, category, countInStock, description } = req.body;

  const meal = await Meal.findById(req.params.id);

  if (meal) {
    meal.name = name;
    meal.price = price;
    meal.image = image;
    meal.category = category;
    meal.countInStock = countInStock;
    meal.description = description;

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } else {
    res.status(404);
    throw Error("meal not found");
  }
});

export { getMeal, getMealById, deleteMeal, createMeal, updateMeal };
