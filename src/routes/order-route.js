const express = require('express')

const authenticateMiddleware =require('../middlewares/authenticate')
const orderController = require('../controllers/order-controller')
const uploadMdw =require('../middlewares/upload')
const router = express.Router()

router.post('/',authenticateMiddleware,orderController.createOrder)
router.get('/status',authenticateMiddleware,orderController.getStatus)
router.post('/slip',authenticateMiddleware,uploadMdw.single("slipImg"),orderController.slipPayment)

module.exports = router