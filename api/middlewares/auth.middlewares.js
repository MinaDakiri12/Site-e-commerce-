const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = (type) => (req, res, next) => {
  const token  = req.cookies['jwt']
  // console.log('token from auth', token)
  if (token){ 
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedtoken) => {
      if (!err && decodedtoken.role === type) {
        res.auth = await User.findById(decodedtoken.id).select('-password');
        next();        
      } else{
           res.status(400).clearCookie('jwt').json('you are not authorized');     
      }
    });
  } else {  
     res.status(400).json({ isAuth: false, role: ''});
  }
};
