const Product = require('../models/Product')
const fs = require('fs');

// Add Product
exports.addProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            image: req.file.path
        })
        const saved = await product.save();
        if (saved) return res.status(201).json({ message: 'data saved!', product });
    } catch (error) {
        return res.status(500).json({ err: 'error save' })

    }
};


//update Product
exports.updateProduct = async (req, res) => {

    try {
        const data = req.file ? {
            ...req.body,
            image: req.file.path
        } : { ...req.body }
        const product = await Product.updateOne({ _id: req.params.id }, { ...data });
        if (product) res.status(201).json(product)
    } catch (error) {
        throw Error(error)
    }
}

//Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        const filename = product.image.split('uploads\\')[1];
        console.log(filename)
        fs.unlink(`uploads/${filename}`, async () => {                                                                      //remove a file 
            const deleted = await Product.deleteOne({ _id: product._id })
            if (deleted) return res.status(200).json('product deleted')
        })

    } catch (error) {
        throw Error(error)
    }
};



//   Get all Product 
exports.allProduct = (req, res) => {
    Product.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        })
}

// getTProductById

exports.getTProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) return res.status(200).json(product)
    } catch (error) {
        throw Error(error)
    }
}



//************get Category

exports.allCategory = (req, res) => {
    Product.find({ category: ['food', 'clothes', 'toys', 'bed', 'accessories'] }).select(' category')
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        })

}