import OrderCashier from "../models/orderCashierModel.js";
import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//Cashier side

//@desc Create new order(cashier)
//@route POST /api/orders/cashier
//@access Private

const createOrderCashier = asyncHandler(async (req, res) => {
  const {
    orderType,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    id,
    change,
    paymentType,
    paid,
    orderItems,
    vat,
  } = req.body;

  const order = new OrderCashier({
    id,
    orderType,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    change,
    paymentType,
    paid,
    orderItems,
    user: req.user.name,
    vat,
  });

  const createOrder = await order.save();
  res.status(201).json(createOrder);
});

//@desc Get all order (cashier)
//@route GET /api/orders/cashier
//@access Private
const getAllOrderCashier = asyncHandler(async (req, res) => {
  const orders = await OrderCashier.find({});

  res.json(orders);
});

//@desc Get order by id(cashier)
//@route GET /api/orders/cashier/:id
//@access Private
const getOrderCashierById = asyncHandler(async (req, res) => {
  const order = await OrderCashier.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    throw new Error("Order not found");
  }
});

//online orders

//@desc Create new order
//@route POST /api/orders
//@access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalItems,
    subtotal,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalItems,
      subtotal,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

//@desc Get order by id
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    throw new Error("Order not found");
  }
});

//@desc update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    throw new Error("Order not found");
  }
});

//@desc get user orders
//@route GET /api/orders/myorders
//@access Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

//@desc get all  orders
//@route GET /api/orders
//@access Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

export {
  createOrderCashier,
  getOrderCashierById,
  getAllOrderCashier,
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
};
