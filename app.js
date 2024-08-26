const express = require('express')
const app = express();
const morgan =  require('morgan')
const bp = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://shop-test:shop@ac-gubxtio-shard-00-00.srynldp.mongodb.net:27017,ac-gubxtio-shard-00-01.srynldp.mongodb.net:27017,ac-gubxtio-shard-00-02.srynldp.mongodb.net:27017/?ssl=true&replicaSet=atlas-oc1zg7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=shop-api')

const db = mongoose.connection;

db.once('open', () => console.log('Successfully connected to MongoDB'));
db.on('error', (e) => console.log('555555555555555555555555555555555555555555555555555555'+e));

const productsRouter = require('./api/routes/products')
const ordersRouter = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bp.urlencoded({extended :false}))
app.use(bp.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origine, X-Request-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/products' , productsRouter)
app.use('/orders' , ordersRouter )

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404
    res.status(error.status || 500);
    res.json({
        message : error.message
    })
    next(error)
})


module.exports  = app;