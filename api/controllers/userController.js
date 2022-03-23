const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ****************************Register
exports.userRegister = async (req, res) => {
    try {

        const user = new User({
            ...req.body
        })
        //check email
        const EmailExist = await User.findOne({ email: req.body.email });
        if (EmailExist) return res.status(400).json({ message: "email already exist!" });
        // ***********hashPassword
        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        const saved = await user.save();
        if (saved) return res.status(201).json({ message: 'data saved!', user });
    } catch (error) {
        return res.status(500).json({ err: 'error server' })
    }

};

// ***********************Login 

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emailUser = await User.findOne({ email })
        if (!emailUser) return res.status(400).json({ message: "invalid email or password" })

        const passwordUser = await bcrypt.compare(password, emailUser.password);
        if (!passwordUser) return res.status(400).json({ message: "invalid email or password" });

        const token = jwt.sign({ id: emailUser._id, role: emailUser.role }, process.env.SECRET_TOKEN, { expiresIn: process.env.EXPIRATION });
        // console.log('token',token)
        return res.status(200).cookie('jwt', token, { maxAge: process.env.EXPIRATION, httpOnly: true }).json({ isAuth: true, role: emailUser.role });
    } catch (error) {
        console.log(error)
    }
}


exports.logoutController = (req, res) => {
    return res.status(200).clearCookie('jwt').json({ isAuth: false, role: '', logged: 'out' });
}

