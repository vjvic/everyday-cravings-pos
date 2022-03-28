import mongoose from "mongoose";

const orderCashierSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    orderType: { type: String, required: true },
    totalItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true },
    change: { type: Number, default: 0 },
    paymentType: { type: String, required: true },
    paid: { type: Number, default: 0 },
    vat: { type: Number, required: true },
    user: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Meal",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrderCashier = mongoose.model("OrderCashier", orderCashierSchema);

export default OrderCashier;
