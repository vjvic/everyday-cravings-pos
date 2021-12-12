import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  change: { type: Number, required: true },
  date: { type: String, required: true },
  paymentType: { type: String, required: true },
  paid: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  totalItem: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
