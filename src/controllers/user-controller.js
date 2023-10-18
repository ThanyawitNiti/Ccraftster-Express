const createError = require("../utils/create-error");

const prisma = require("../models/prisma");

const { checkUserIdSchema } = require("../validators/auth-validator");

exports.getAllItem = async (req, res, next) => {
  try {
    const showProducts = await prisma.product.findMany({});

    res.status(200).json({ showProducts });
  } catch (err) {
    next(err);
  }
};

exports.addItemToCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    const product_id = +req.body.id;
    const {amount} =req.body
    const oldproduct = await prisma.cart.findFirst({
      where:{
        product_id,
        user_id:id
      }
    
    });
    // const test =oldproduct.find((el)=> el.product_id == product_id && el.user_id == id)

    if (oldproduct) {

      await prisma.cart.updateMany({
        data: {
          user_id:id,
          product_id :product_id,
          amount:oldproduct.amount+1
          
        },
        where: {
          id:oldproduct.id
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          user_id: id,
          product_id: product_id,
          amount: 1,
        },
      });
    }
   
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
  }
};

