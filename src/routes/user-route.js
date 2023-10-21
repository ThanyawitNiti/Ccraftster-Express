const express = require('express')

const userController = require('../controllers/user-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.get('/product',userController.getAllItem)

router.post('/cart',authenticateMiddleware,userController.addItemToCart)
router.delete('/cart/:product_id',authenticateMiddleware,userController.decreaseItemInCart)

router.get('/cartpage',authenticateMiddleware,userController.showItemInCart)

router.delete('/itemincartpage/:productId',authenticateMiddleware,userController.deleteItemInCartPage)




module.exports = router