const { upload } = require("../utils/cloudinary-service");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { json } = require("express");
const { checkProductIdSchema } = require("../validators/product-validator");

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
  try {
    const products = await prisma.product.findMany({});

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { value, error } = checkProductIdSchema.validate(req.params);
    console.log(value)
    if (error) {
      return next(error);
    }
    const deleteProduct = await prisma.product.findFirst({
        where :{
            id: value.productId
        }
    })
    if(!deleteProduct){
        return next(createError("Sorry does not have this item ID", 400));
    }
    console.log(deleteProduct)

   const test = await prisma.product.delete({
        where:{
            id:deleteProduct.id
        }
    })
    console.log(test)
    res.status(200).json({Message: 'Delete'})
  } catch (err) {
    next(err);
  }
};
