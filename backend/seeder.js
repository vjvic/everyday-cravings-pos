import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import meals from "./data/meals.js";
import User from "./models/userModel.js";
import Meal from "./models/mealModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Meal.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleMeals = meals.map((meal) => {
      return { ...meal, user: adminUser };
    });

    await Meal.insertMany(sampleMeals);

    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Meal.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
