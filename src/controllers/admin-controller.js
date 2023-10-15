const {upload} = require('../utils/cloudinary-service')
const createError = require('../utils/create-error')
const prisma =require('../models/prisma')

exports.createItem = async (req,res,next) =>{
    console.log(`'req.file :${req.file}'`)
    console.log(`'req.files :${req.files}'`)
    try{
        const {product_name , price ,category} =req.body
        if((product_name === undefined ||
        price === undefined ||
        category === undefined) && req.file )
        {
            return next(createError("Informations are required", 400));
        }
        console.log(product_name)
        console.log(price)
        console.log(category)
        console.log(req.file)
        const adminAddItem = {}
        // console.log(`adminData : ${adminData.userId}`)
        if(product_name && price && category && req.file ){
            console.log('If is work!')
            adminAddItem.product_name= product_name
            adminAddItem.price = price
            adminAddItem.category = category
            adminAddItem.img_url = await upload(req.file.path)
        }

        console.log(adminAddItem)
        
    }catch(err){
        next(err)
    }
}
