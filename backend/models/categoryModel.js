import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
