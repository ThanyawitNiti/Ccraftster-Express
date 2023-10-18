const express = require('express')

const userController = require('../controllers/user-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.get('/product',userController.getAllItem)

router.post('/cart',authenticateMiddleware,userController.addItemToCart)



// router.post('/:userId',authenticateMiddleware,userController.addItem)
// router.post('/:userId',authenticateMiddleware,userController.addItemForAdmin)


module.exports = router