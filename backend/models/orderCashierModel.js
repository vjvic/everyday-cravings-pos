import mongoose from "mongoose";

const orderCashierSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    orderType: { type: String, required: true },
    totalItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderCashier = mongoose.model("OrderCashier", orderCashierSchema);

export default OrderCashier;
