const { defaults } = require('joi')
const prisma = require('../models/prisma')

exports.createOrder = async (req,res,next) =>{
    try{
       console.log('####',req.body)
       const  order = req.body.map((el) =>{
        return el.user_id
       })
       const indexOrder = 1
       console.log(order)
       const orderTotal =req.body.reduce((acc,item)=>{
        let total = item.amount * item.product.price
        acc+= total
        return acc
    },0)
    console.log(orderTotal)
    const orderFromUser = await prisma.order.create({
        data:{
            user_id: order[indexOrder],
            total_price:orderTotal.toString(),
            payment_status:false
            }
        }
    )
    console.log(orderFromUser)
    console.log('2222222222',orderFromUser.id)
    

    res.status(200).json({ message: "Order table created" })
    }catch(err){
        console.log(err)
    }
}