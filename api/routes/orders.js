const express = require('express')
const router= express.Router();

router.get('/' , (req,res,next)=>{
    res.status(200).json({
        message:'handeling a GET req from /orders'
    })
})
router.post('/' , (req,res,next)=>{
    const order = {
        productId:req.body.productId,
        quantity:req.body.quantity
    }
    res.status(200).json({
        message:'handeling a POST req from /orders',
        order:order
    })
})
router.delete('/:productId' , (req,res,next)=>{
    res.status(200).json({
        message:'handeling a DELETE req from /orders'
    })
})
router.get('/:productID' , (req,res,next)=>{
    const id = req.params.productID
    res.status(200).json({
        message:'handeling a get req for a product',
        id:id
    })
})

module.exports = router;