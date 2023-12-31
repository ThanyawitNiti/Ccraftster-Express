require('dotenv').config();
const express = require('express')
const cors =require('cors');
const morgan = require('morgan')

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const rateLimitMiddleware = require('./middlewares/rate-limit');
const sharingRoute = require('./routes/sharing-route')
const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const adminRoute = require('./routes/admin-route')
const orderRoute = require('./routes/order-route')
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(rateLimitMiddleware);
app.use(express.json());

// app.use()
app.use('/',sharingRoute)
app.use('/auth',authRoute)
app.use('/admin',adminRoute)
app.use('/user',userRoute)
app.use('/order',orderRoute)






app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || '5000';
app.listen(PORT, ()=>{console.log(`server running on port : ${PORT}`)
});