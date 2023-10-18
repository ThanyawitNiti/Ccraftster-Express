const { rateLimit} = require('express-rate-limit')

module.exports  = rateLimit({
    windowMs : 15 * 60 * 1000,
    limit :1000,
    message : "Too many request from this IP"
})
