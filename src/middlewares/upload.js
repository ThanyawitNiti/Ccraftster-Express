const multer = require('multer')


const  storage = multer.diskStorage(
    {
        
        destination: (req,file,cb)=>{
            console.log(destination)
            cb(null,'./multerfile')
            console.log('test')
        }, 

        filename:(req,file,cb) => {

            cb(null,Date.now() + '-' + file.originalname)
            // console.log(filename)
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
const upload =multer({ storage:storage,limits: { fileSize: 1024*1024*5 }, })

module.exports = upload

