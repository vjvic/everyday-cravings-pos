import asyncHandler from "express-async-handler";
import Supplier from "../models/supplierModel.js";

//@desc Create supplier
//@route POST /api/supplier
//@access Private/admin
const createSupplier = asyncHandler(async (req, res) => {
  const { name, contact, address, type, isActive } = req.body;

  const supplier = await Supplier.create({
    name,
    contact,
    address,
    type,
    isActive,
  });

  if (supplier) {
    res.json({
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address,
      type: supplier.type,
      isActive: supplier.isActive,
    });
  } else {
    throw new Error("Supplier not found");
  }
});

//@desc get all supplier
//@route GET /api/supplier
//@access Private/admin

const getAllSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.find({});

  res.json(supplier);
});

//@desc Delete supplier by id
//@route DELETE /api/supplier/:id
//@access Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await supplier.remove();
    res.json({ message: "Supplier removed" });
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

//@desc Update supplier
//@route PUT /api/supplier/:id
//@access Private/Admin
const updateSupplier = asyncHandler(async (req, res) => {
  const { name, contact, address, type, isActive } = req.body;

  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    supplier.name = name;
    supplier.contact = contact;
    supplier.address = address;
    supplier.type = type;
    supplier.isActive = isActive;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw Error("Supplier not found");
  }
});

//@desc Get supplier by ID
//@route GET /api/supplier/:id
//@access Private/Admin
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

export {
  createSupplier,
  getAllSupplier,
  deleteSupplier,
  updateSupplier,
  getSupplierById,
};
