const router = require('express').Router();

const Product = require('../models/Product');

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

// create
router.post("/",verifyTokenAndAdmin ,async (req,res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {

    try{
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true}
    );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});


//delete 

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has beeb deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//get product

router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all products

router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.Category;
    try{
       let products;

       if(queryNew){
           products = await products.find().sort({createdAt: -1 }).limit(5);
       }else if(queryCategory){
           products = await products.find({categories: {$in: [queryCategory]}});
       }else{
           products = await products.find();
       }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router;