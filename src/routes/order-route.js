const express = require('express')

const authenticateMiddleware =require('../middlewares/authenticate')

const router = express.Router()

router.post('/',authenticateMiddleware)

module.exports = router