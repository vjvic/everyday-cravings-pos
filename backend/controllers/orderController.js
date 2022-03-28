import OrderCashier from "../models/orderCashierModel.js";
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



export {
  createOrderCashier,
  getOrderCashierById,
  getAllOrderCashier,
};
