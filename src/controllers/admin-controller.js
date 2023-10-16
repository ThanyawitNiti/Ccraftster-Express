const { upload } = require("../utils/cloudinary-service");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { json } = require("express");

exports.createItem = async (req, res, next) => {
  // console.log(req.body)
  // console.log(req.file)
  try {
    const { product_name, price, category } = req.body;
    if (
      (product_name === undefined ||
        price === undefined ||
        category === undefined) &&
      !req.file
    ) {
      return next(createError("Informations are required", 400));
    }

    const adminAddItem = {};

    if (product_name && price && category && req.file) {
      console.log("If is work!");
      adminAddItem.product_name = product_name;
      adminAddItem.price = price;
      adminAddItem.category = category;
      adminAddItem.img_url = await upload(req.file.path);
      // console.log(req.file.path)
      console.log(adminAddItem);
    }
    const addItem = await prisma.product.create({
      data: adminAddItem,
    });
    res.status(200).json({ message: "Prodcut added", addItem });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllItem = async (req, res, next) => {
  console.log("asdasd");
  try {
    const products = await prisma.product.findMany({
     
    });

    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
