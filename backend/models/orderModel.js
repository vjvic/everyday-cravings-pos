import mongoose from "mongoose";

/* const orderSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  change: { type: Number, required: true },
  date: { type: String, required: true },
  paymentType: { type: String, required: true },
  paid: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  totalItem: { type: Number, required: true },
}); */

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
