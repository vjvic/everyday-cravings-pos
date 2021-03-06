import asyncHandler from "express-async-handler";
import Ingredient from "../models/ingredientModel.js";

//@desc Create ingredient
//@route POST /api/ingredient
//@access Private/admin
const createIngredient = asyncHandler(async (req, res) => {
  const { name, qty, measure, isActive, supplier, cost, id } = req.body;

  const ingredient = await Ingredient.create({
    name,
    qty,
    measure,
    supplier,
    isActive,
    cost,
    id,
  });

  if (ingredient) {
    res.json({
      id: ingredient.id,
      name: ingredient.name,
      qty: ingredient.qty,
      supplier: ingredient.supplier,
      measure: ingredient.measure,
      isActive: ingredient.isActive,
      cost: ingredient.cost,
    });
  } else {
    throw new Error("Ingredient not found");
  }
});

//@desc get all ingredient
//@route GET /api/ingredient
//@access Private/admin

const getAllIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.find({});

  res.json(ingredient);
});

//@desc Delete ingredient by id
//@route DELETE /api/ingredient/:id
//@access Private/Admin
const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    await ingredient.remove();
    res.json({ message: "Ingredient removed" });
  } else {
    res.status(404);
    throw new Error("Ingredient not found");
  }
});

//@desc Update ingredient
//@route PUT /api/ingredient/:id
//@access Private/Admin
const updateIngredient = asyncHandler(async (req, res) => {
  const { name, qty, measure, supplier, isActive, cost } = req.body;

  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    ingredient.name = name;
    ingredient.qty = qty;
    ingredient.supplier = supplier;
    ingredient.measure = measure;
    ingredient.isActive = isActive;
    ingredient.cost = cost;

    const updateIngredient = await ingredient.save();
    res.json(updateIngredient);
  } else {
    res.status(404);
    throw Error("Ingredient not found");
  }
});

//@desc Get ingredient by ID
//@route GET /api/ingredient/:id
//@access Private/Admin
const getIngredientById = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404);
    throw new Error("Ingredient not found");
  }
});

//@desc Update ingredient stock
//@route PUT /api/ingredient/:id
//@access Private
const updateIngredientStock = asyncHandler(async (req, res) => {
  const { qty } = req.body;

  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    ingredient.qty = qty;

    const updatedIngredientStock = await ingredient.save();
    res.json(updatedIngredientStock);
  } else {
    res.status(404);
    throw Error("Ingredient not found");
  }
});

export {
  createIngredient,
  getAllIngredient,
  deleteIngredient,
  updateIngredient,
  getIngredientById,
  updateIngredientStock,
};
