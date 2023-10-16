const multer = require('multer')


const  storage = multer.diskStorage(
    {
        
        destination: (req,file,cb)=>{
            cb(null,'multerfile')
            console.log('test')
        }, 

        filename:(req,file,cb) => {

            cb(null,Date.now() + '-' + file.originalname)
            // const split = file.originalname.split('.')
            // cb(null,
            // '' +
            // Date.now() + 
            // Math.round(Math.random() * 1000000) + 
            // '.' + 
            // split[split.length-1] )
            
        }
    },
    
        
) 
const upload =multer({ storage:storage })

module.exports = upload

