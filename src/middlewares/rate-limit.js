const { rateLimit} = require('express-rate-limit')

module.exports  = rateLimit({
    windowMs : 20 * 60 * 2000,
    limit :2000,
    message : "Too many request from this IP"
})
