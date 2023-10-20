const express = require('express')

const userController = require('../controllers/user-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.get('/product',userController.getAllItem)

router.post('/cart',authenticateMiddleware,userController.addItemToCart)

router.get('/cartpage',authenticateMiddleware,userController.showItemInCart)

router.delete('/cartpage/:product_id',authenticateMiddleware,userController.deleteItemInCart)




module.exports = router