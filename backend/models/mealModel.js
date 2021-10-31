import mongoose from "mongoose";

const mealSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requiredd: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Numer,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timeStamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
