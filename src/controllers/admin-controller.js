const fs = require("fs/promises");
const { upload } = require("../utils/cloudinary-service");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { checkProductIdSchema } = require("../validators/product-validator");

exports.createItem = async (req, res, next) => {
  console.log(req.body);

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
      adminAddItem.product_name = product_name;
      adminAddItem.price = price;
      adminAddItem.category = category;
      adminAddItem.img_url = await upload(req.file.path);
    }
    const addItem = await prisma.product.create({
      data: adminAddItem,
    });
    res.status(200).json({ message: "Prodcut added", addItem });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
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
    console.log(value);
    if (error) {
      return next(error);
    }
    const deleteProduct = await prisma.product.findFirst({
      where: {
        id: value.productId,
      },
    });
    if (!deleteProduct) {
      return next(createError("Sorry do not have this item ID", 400));
    }
  

    await prisma.product.delete({
      where: {
        id: deleteProduct.id,
      },
    });
    
    res.status(200).json({ Message: "Product Deleted" });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { value, error } = checkProductIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const editProduct = await prisma.product.findFirst({
      where: {
        id: value.productId,
      },
    });
    if (!editProduct) {
      return next(createError("Sorry does not have this item ID", 400));
    }

    const { product_name, price, category } = req.body;
    
    if (product_name || price || category) {
      editProduct.product_name = product_name;
      editProduct.price = price;
      editProduct.category = category;
    }
    
    if(req.file){
      editProduct.img_url = await upload(req.file.path);
    }

    const doneEditProductByAdmin = await prisma.product.update({
      data: {
        product_name: editProduct.product_name,
        price: editProduct.price,
        category: editProduct.category,
        img_url: editProduct.img_url,
      },
      where: {
        id: editProduct.id,
      },
    });
    res.status(200).json({message:"Update Done", doneEditProductByAdmin})
  } catch (err) {
    next(err);
  }finally{
    if (req.file){
      fs.unlink(req.file.path)
    }
  }
};

exports.getStatusFromUser = async (req, res, next) => {
  try {
    console.log("GET STATUS From User");
    const { id } = req.user;

    const statusPayment = await prisma.order.findMany({
      where: {
        payment_status: false,
      },
      include:{
        user:true
      }
      
    });

  
    res.status(200).json({
      message: "Status Payment From User",
      statusPayment,
      
    });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req,res,next)=>{
  try {
    const { id } = req.params;
    console.log(id)

    // if (!req.file) {
    //   return next(createError("Informations are required", 400));
    // }

    // if (req.file) {
    //   slipImg = await upload(req.file.path);
    // }

    const addSlip = await prisma.order.update({
      where: {
        id: +id,
      },
      data: {
        // slipImg: slipImg,
        payment_status: true,
      },
    });
    res.status(200).json({ message: " Slip Added", addSlip });
  } catch (err) {
    next(err);
  }
}

