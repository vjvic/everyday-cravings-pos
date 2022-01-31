import mongoose from "mongoose";

const orderCashierSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    orderType: { type: String, required: true },
    totalItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true },
    change: { type: Number, default: 0 },
    paymentType: { type: String, required: true },
    paid: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const OrderCashier = mongoose.model("OrderCashier", orderCashierSchema);

export default OrderCashier;
