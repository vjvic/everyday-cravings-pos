import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

//@desc Create category
//@route POST /api/category
//@access Private/admin
const createCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  const categoryCreated = await Category.create({ category });

  if (category) {
    res.json({ category: categoryCreated.category });
  } else {
    throw new Error("Category not found");
  }
});

//@desc get all category
//@route GET /api/category
//@access Private/admin

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});

  res.json(category);
});

//@desc Delete category by id
//@route DELETE /api/category/:id
//@access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

//@desc Update category
//@route PUT /api/category/:id
//@access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  const categoryUpdate = await Category.findById(req.params.id);

  if (category) {
    categoryUpdate.category = category;

    const categoryUpdated = await categoryUpdate.save();
    res.json(categoryUpdated);
  } else {
    res.status(404);
    throw Error("Category not found");
  }
});

export { createCategory, getAllCategory, deleteCategory, updateCategory };
