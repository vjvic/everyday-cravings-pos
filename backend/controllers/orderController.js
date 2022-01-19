import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
//@desc Fetch all orders
//@route GET /api/orders
//@access Private
/* const getOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.json(orders);
}); */

//@desc Create order
//@route POST /api/orders
//@access Private/Admin
/* const createOrder = asyncHandler(async (req, res) => {
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
 */
//@desc Fetch order by id
//@route GET /api/orders/:id
//@access Private
/* const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export { getOrder, createOrder, getOrderById }; */

//get order
//create order
//get order by id

//@desc Create new order
//@route POST /api/orders
//@access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
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
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
};
