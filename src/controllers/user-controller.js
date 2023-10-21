const createError = require("../utils/create-error");

const prisma = require("../models/prisma");

const { checkUserIdSchema } = require("../validators/auth-validator");
const { checkProductIdSchema } = require("../validators/product-validator");

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
    console.log(req.body)
    const { amount } = req.body;
    const oldproduct = await prisma.cart.findFirst({
      where: {
        product_id,
        user_id: id,
      },
    });
    // const test =oldproduct.find((el)=> el.product_id == product_id && el.user_id == id)
    console.log(oldproduct)
    if (oldproduct) {
      await prisma.cart.updateMany({
        data: {
          user_id: id,
          product_id: product_id,
          amount: oldproduct.amount + 1,
        },
        where: {
          id: oldproduct.id,
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

exports.showItemInCart = async (req, res, next) => {
  try {
    // const { img_url, product_name, price, amount } = req.body;
    const { id } = req.user;

    const showItemToUser = await prisma.cart.findMany({
      where: {
        user_id: id,
      },
      include: {
        product: {
          select: {
            img_url: true,
            product_name: true,
            price: true,
          },
        },
      },
    });

    res.status(200).json( {showItemToUser} );
  } catch (err) {
    console.log(err);
  }
};

exports.decreaseItemInCart = async (req,res,next) =>{
try{
  // const {id} =req.user
  const { value, error } = checkProductIdSchema.validate(req.params);
  console.log(`##fsadfsdfdfsdff ${value.amount}`)


  console.log(value)
  console.log(req.user.id)
  console.log(`xxxxxxxxxxxxxxxxxxxxxxxxx ${value.product_id}`)
  // const product_id = req.params
  console.log(`########### ${req.params}`)
  const oldproductde = await prisma.cart.findFirst({
    where:{
      product_id:+value.product_id,
      user_id:req.user.id
    }
  })
  if(oldproductde){
    await prisma.cart.updateMany({
      data:{
        user_id:req.user.id,
        product_id:+value.product_id,
        amount : oldproductde.amount-1
      },
      where:{
        id:oldproductde.id
      }
    })
    console.log(oldproductde)
  }else {
    return next(createError('Have no ID',401))
  }

res.status(200).json({message:"ok"})
}catch(err){
  console.log(err)
}
}

exports.deleteItemInCartPage = async (req,res,next)=>{
  try{
    const {id} = req.user
    const {value ,error} = checkProductIdSchema.validate(req.params);
    console.log(req.params)
    console.log(value.productId)
    if (error) {
      return next(error);
    }
    const deleteItemInCartPage = await prisma.cart.findFirst({
      where:{
        user_id:id,
        product_id:value.productId
      }
      
    })
    if(!deleteItemInCartPage){
      return next(createError("Sorry do not have this item ID", 400));
    }

    console.log(deleteItemInCartPage)
    await prisma.cart.delete({
      where:{
        id :deleteItemInCartPage.id,
        user_id:id,
        product_id:value.productId
      }
    })
    res.status(200).json({ Message: "ItemInCartPage Deleted" })
  }catch(err){
    console.log(err)
  }
}