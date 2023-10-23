const express = require('express')

const authenticateMiddleware =require('../middlewares/authenticate')
const orderController = require('../controllers/order-controller')
const router = express.Router()

router.post('/',authenticateMiddleware,orderController.createOrder)

module.exports = router