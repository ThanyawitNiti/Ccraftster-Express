const { defaults } = require("joi");
const prisma = require("../models/prisma");

exports.createOrder = async (req, res, next) => {
  try {
    console.log("####", req.body);
    const user_id = req.body.map((el) => {
      return el.user_id;
    });
    const indexUserId = 1;
    console.log(user_id);
    const orderTotal = req.body.reduce((acc, item) => {
      let total = item.amount * item.product.price;
      acc += total;
      return acc;
    }, 0);
    console.log(orderTotal);
    const orderFromUser = await prisma.order.create({
      data: {
        user_id: user_id[indexUserId],
        total_price: orderTotal.toString(),
        payment_status: false,
      },
    });
    console.log(orderFromUser);
    console.log("###ID###", orderFromUser.id);
    // const quantity = req.body.map((el)=>{
    //     return el.amount
    // })
    // console.log(quantity)
const orderProductTable = []

    for (const reqBody of req.body) {
      const { id,user_id, amount, product_id } = reqBody;
      const orderProduct = await prisma.orderProduct.create({
        data: {
          quantity: amount.toString(),
          product:{
            connect:{
                id: product_id,
            }
          },
          order:{
            connect:{
                id:orderFromUser.id
            }
          },
        },
      });
      orderProductTable.push(orderProduct)
    }
  console.log(orderProductTable)

    res.status(200).json({ message: "Order table created" });
  } catch (err) {
    console.log(err);
  }
};
