import mongoose from "mongoose";

const ingredientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    supplier: { type: String, required: true },
    measure: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    cost: { type: Number, required: true },
  },
  {
    timeStamps: true,
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
