import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
