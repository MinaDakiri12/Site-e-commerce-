const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        default: 0.0
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        ennum:
            [
                'food',
                'clothes',
                'toys',
                'bed',
                'accessories'
            ]

    }
})

module.exports = mongoose.model('Product', productSchema);