const userController = require('../controllers/userController')
const productControllers = require('../controllers/productController')
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middlewares')
const multer = require('../multer/multer')



//authController
router.post('/registerUser', userController.userRegister); //registerUser
router.post('/login', userController.loginUser); // login 
router.post('/logout', userController.logoutController); // login 


//productController
router.post('/add', multer.single('image'), productControllers.addProduct);
router.put('/update/:id', multer.single('image'), productControllers.updateProduct);
router.delete('/delete/:id', productControllers.deleteProduct);
router.get('/allProduct', productControllers.allProduct);
router.get('/getTById/:id', productControllers.getTProductById);
router.get('/Category', productControllers.allCategory);
// router.put('/updateProduct/id:',productControllers.updateProduct)




//categoryController

module.exports = router;