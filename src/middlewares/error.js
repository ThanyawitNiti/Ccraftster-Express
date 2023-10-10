module.exports = (err,req,res,next)=>{
    if(err.name === 'Validation Error'){
        err.statusCode = 400 
    }
    res.status(err.statusCode || 500).json({ message : err.message })
}