const { registerSchema, loginSchema } = require("../validators/auth-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const createError =require('../utils/create-error');
const { boolean } = require("joi");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    // console.log(error.message)
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 10);

    const user = await prisma.user.create({
      data: value,
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "DefaultRandom",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;

    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    console.log(`value from Schema ${value}`)
    if (error) {
      return next(error);
    }

    const user = await prisma.user.findUnique({
      where: {
         email: value.email 
      }
    })

    if(!user) {
        return next(createError('Invalid credential Email',400))
    }
    const isMatch = await bcrypt.compare(value.password,user.password)
    if(!isMatch){
        return next(createError('Invalid credential Password',400))
    }
    const payload = { userId: user.id }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY || "DefaultRandom",
        { expiresIn: process.env.JWT_EXPIRE }
      ); 
      delete user.password
      console.log(`test ${user.first_name}`)

      res.status(200).json({ accessToken ,user });

  } catch (err) {
    next(err);
  }
};

exports.getMe = (req,res,next) =>{
  res.status(200).json({ user : req.user})
  

}