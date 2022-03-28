import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timeStamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
