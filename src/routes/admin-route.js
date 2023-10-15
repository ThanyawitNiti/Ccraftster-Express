const express =require('express')
const adminAuthenticate = require('../middlewares/admin-authenticate')
const uploadMdw = require('../middlewares/upload')
const adminController = require('../controllers/admin-controller')


const router = express.Router()

router.post('/',adminAuthenticate,uploadMdw.single("img_url"),adminController.createItem
)

module.exports = router