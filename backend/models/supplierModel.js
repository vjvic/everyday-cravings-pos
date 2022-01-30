import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    isActve: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
