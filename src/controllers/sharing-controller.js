const prisma = require('../models/prisma')

exports.showProduct = async (req,res,next)=>{
    try{
         const showProductsFromSharingRoute =  await prisma.product.findMany({});
   res.status(200).json({ showProductsFromSharingRoute});

  } catch (err) {
    next(err);
  }
};
