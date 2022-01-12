import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel.js";

//@desc Fetch all meals
//@route GET /api/meals
//@access Public
const getMeal = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const meals = await Meal.find({ ...keyword });

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

//@desc Fetch meal by category
//@route GET /api/meals/category/:category
//@access Public
const getMealByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  const meals = await Meal.find({ category });

  res.json(meals);
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

//@desc Create new review
//@route PUT /api/meals/:id/reviews
//@access Private
const createMealReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const meal = await Meal.findById(req.params.id);

  if (meal) {
    const alreadyReviewed = meal.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Meal already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    meal.reviews.push(review);

    meal.numReviews = meal.reviews.length;

    meal.rating =
      meal.reviews.reduce((acc, item) => item.rating + acc, 0) /
      meal.reviews.length;

    meal.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw Error("meal not found");
  }
});

export {
  getMeal,
  getMealById,
  deleteMeal,
  createMeal,
  updateMeal,
  createMealReviews,
  getMealByCategory,
};
