const Joi =require('joi')

const checkProductIdSchema = Joi.object({
    productId :Joi.number().integer().positive().required(),
    amount : Joi.number().integer().positive()
})


exports.checkProductIdSchema = checkProductIdSchema