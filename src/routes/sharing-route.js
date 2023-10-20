const express = require('express')
const sharingController =require('../controllers/sharing-controller')

const router = express.Router()

router.get('/productpage',sharingController.showProduct)
module.exports = router