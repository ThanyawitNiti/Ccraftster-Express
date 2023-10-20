const Joi =require('joi')

const checkProductIdSchema = Joi.object({
    productId :Joi.number().integer().positive().required(),
    amount : Joi.number().integer().positive()
})

// const checkAmountSchema = Joi.object({
//     amount : Joi.number().integer().positive()
// })

// exports.checkAmountSchema = checkAmountSchema
exports.checkProductIdSchema = checkProductIdSchema