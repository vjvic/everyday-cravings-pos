import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //return user data if match
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      isCashier: user.isCashier,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc User profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      isCashier: user.isCashier,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Register new user
//@route GET /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, id } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({ name, email, password, id });

  if (user) {
    res.json({
      _id: user._id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      isCashier: user.isCashier,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
      isAdmin: updateUser.isAdmin,
      isCashier: updateUser.isCashier,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get all users
//@route GET /api/users/profile
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role;
    user.isAdmin = req.body.isAdmin;
    user.isCashier = req.body.isCashier;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
      isCashier: updatedUser.isCashier,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
