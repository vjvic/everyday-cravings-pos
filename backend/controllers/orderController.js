import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
//@desc Fetch all orders
//@route GET /api/orders
//@access Private
const getOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.json(orders);
});

//@desc Create order
//@route POST /api/orders
//@access Private/Admin
const createOrder = asyncHandler(async (req, res) => {
  const {
    customerName,
    change,
    date,
    paymentType,
    paid,
    subTotal,
    totalAmount,
    totalItem,
  } = req.body;

  const order = await Order.create({
    customerName,
    change,
    date,
    paymentType,
    paid,
    subTotal,
    totalAmount,
    totalItem,
  });

  if (order) {
    res.json({
      _id: order._id,
      customerName: order.customerName,
      change: order.change,
      date: order.date,
      paymentType: order.paymentType,
      paid: order.paid,
      subTotal: order.subtotal,
      totalAmount: order.totalAmount,
      totalItem: order.totalItem,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Fetch order by id
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export { getOrder, createOrder, getOrderById };

//get order
//create order
//get order by id
