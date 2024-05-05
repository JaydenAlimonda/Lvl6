const express = require("express");
const mongoose = require ('mongoose')
const morgan = require('morgan')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT

app.use (express.json())
app.use (morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, (err) => console.log('connected to db', err))

app.use('/api/auth', require('./routes/authRouter.js'))


app.use((err, req,res,next)=>{
console.log(err)
if(err.name === 'UnauthorizedError'){
    res.status(err.status)
}
return res.send({errMsg : err.message})

})
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})