const express =require('express')
const adminAuthenticate = require('../middlewares/admin-authenticate')
const uploadMdw = require('../middlewares/upload')
const adminController = require('../controllers/admin-controller')


const router = express.Router()

router.post('/',adminAuthenticate,uploadMdw.single("img_url"),adminController.createItem
)
router.get('/item',adminAuthenticate,adminController.getAllItem)

// /item/
module.exports = router