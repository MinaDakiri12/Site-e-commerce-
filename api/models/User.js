const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 48,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        min: 3, max: 48,
        trim: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    role: {
        type: String,
        ennum: ['user','admin'],
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;