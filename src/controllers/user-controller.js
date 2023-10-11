const createError = require("../utils/create-error");

const prisma = require("../models/prisma");

const { checkUserIdSchema } = require("../validators/auth-validator");

exports.addItem = (req, res, next) => {
  try {
    const {value,error} = checkUserIdSchema.validate(req.params)
    console.log(`This is from validate: ${value.userId}`)
    if(error){
        return next(error)
    }
    if(value.userId === value.userId ){
        next('route')
    }else{
        res.status(200).json({message:'ok'})
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addItemForAdmin = async (req,res,next)=>{
    try{
        console.log('this is for admin')
    }catch(err){
        console.log(err)
    }
}
