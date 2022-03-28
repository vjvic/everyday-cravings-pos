import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel.js";

//@desc Fetch all meals
//@route GET /api/meals
//@access Public
const getMeal = asyncHandler(async (req, res) => {
  /*  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1; */

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  /*   const count = await Meal.countDocuments({ ...keyword }); */
  const meals = await Meal.find({ ...keyword });
  /*   .limit(pageSize)
    .skip(pageSize * (page - 1)); */

  /*  res.json({ meals, page, pages: Math.ceil(count / pageSize) }); */
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
    id,
    name,
    price,
    image,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const meal = await Meal.create({
    id,
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
      id: meal.id,
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

//@desc Update meal stock
//@route PUT /api/meals/:id
//@access Private
const updateMealStock = asyncHandler(async (req, res) => {
  const { countInStock } = req.body;

  const meal = await Meal.findById(req.params.id);

  if (meal) {
    meal.countInStock = countInStock;

    const updatedMealStock = await meal.save();
    res.json(updatedMealStock);
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
  updateMealStock,
};
