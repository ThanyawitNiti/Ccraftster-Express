const { defaults } = require("joi");
const fs = require('fs/promises')
const prisma = require("../models/prisma");
const { json } = require("express");
const { upload } = require("../utils/cloudinary-service");
const createError =require("../utils/create-error")

exports.createOrder = async (req, res, next) => {
  try {
    console.log(req.body)
    const user_id = req.body.map((el) => {
      return el.user_id;
    });
    const indexUserId = 0;
    const orderTotal = req.body.reduce((acc, item) => {
      let total = item.amount * item.product.price;
      acc += total;
      return acc;
    }, 0);
    console.log(user_id)
    const orderFromUser = await prisma.order.create({
      data: {
        user_id: +user_id[indexUserId],
        total_price: orderTotal.toString(),
        payment_status: false,
      },
    });
const orderProductTable = []
console.log('55555555555555555555555555555555555')
    for (const reqBody of req.body) {
      const { id,user_id, amount, product_id } = reqBody;
      const orderProduct = await prisma.orderProduct.create({
        data: {
          quantity: amount.toString(),
          product:{
            connect:{
                id: +product_id,
            }
          },
          order:{
            connect:{
                id:+orderFromUser.id
            }
          },
        },
      });
      orderProductTable.push(orderProduct)
    }
  console.log(orderProductTable)

    res.status(200).json({ message: "Order table created",orderFromUser,orderProductTable });
  } catch (err) {
    next(err);
  }
};



//  exports.deleteCart = async (req,res,next) =>{
//     try{
//           res.status(200).json({message:'ok'})
//       }catch(err){
//                    next(err)
//             }
// }
            

 exports.getStatus = async (req,res,next)=>{
                try{
                  console.log('GET STATUS')
                    const {id} = req.user
            
                    const statusPayment = await prisma.order.findMany({
                        where:{
                            user_id:id,
                            payment_status:false
                        }
                    })
                    
                  

                    const statusPaymentTrue = await prisma.order.findMany({
                      where:{
                          user_id:id,
                          payment_status:true
                      }
                  })

                  console.log(statusPaymentTrue)
            
                res.status(200).json({
                    message:"Status Payment"
                    ,statusPayment,statusPaymentTrue
                })
                }catch(err){
                    next(err)
                }
            }
exports.slipPayment = async (req,res,next)=>{
    try{
      console.log('sadas')
      const {id} = req.body
      
        if(!req.file)
        {
            return next(createError("Informations are required", 400));
          }

          
        if(req.file){
            slipImg = await upload(req.file.path)
        }

        const addSlip = await prisma.order.update({
          where:{
            id:+id
          },
            data:{
              slipImg:slipImg,
              payment_status:true
            }
        })
        res.status(200).json({message :" Slip Added" , addSlip})
    }catch(err){
        next(err)
    }finally {
        if (req.file) {
          fs.unlink(req.file.path);
        }
      }
}