const express = require("express");

const router = express.Router();

const Product = require('../models/product');
const { default: mongoose } = require("mongoose");

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'handeling GET Request to /products'
    })
})

router.post('/',(req,res,next)=>{
    // const product = {
    //     name:req.body.name,
    //     price:req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    product.save().then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
    res.status(200).json({
        message: 'handeling POST Request to /products',
        product:product
    })

})
router.get('/:productID' , (req,res,next)=>{
    const id = req.params.productID;
    Product.findById(id)
    .then(doc=>console.log(doc))   
    .catch(err=>console.log(err))
})
router.patch('/:productID' , (req,res,next)=>{
    const id = req.params.productID
    res.status(200).json({
        message :'handeling a PATCH req for a product id',
        id:id
    })
})
router.delete('/:productID' , (req,res,next)=>{
    const id = req.params.productID
    res.status(200).json({
        message :'handeling a DELETE req for a product id',
        id:id
    })
})

module.exports = router