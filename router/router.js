const express = require('express')
const router = express.Router()

const passport = require('passport');
// const upload = require('../config/gfs');
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth'); 

const {
    getHome,
    getAdmin,
    getLogin,
    getAboutUs,
    getSerivces,
    getProducts,
    getContactUs,
    getSingleProduct,
    logout,
    postAddProduct,  
    postSingleProduct,
    postMobileNumber,
    postSignup,
    postContact,
    postDeletProduct,
    postLogin,
} = require('./controlers'); 

router.get('/', getHome); 
// router.get('/admin', ensureAuthenticated, getAdmin);
// router.get('/login', forwardAuthenticated, getLogin);
// router.get('/about', getAboutUs);
// router.get('/services', getSerivces);
// router.get('/products', getProducts);
// router.get('/contact', getContactUs);
// router.get('/singleProduct/:id', getSingleProduct);

router.post('/login', postLogin);
// router.delete('/logout',  logout);
router.post('/signup', postSignup);

// router.post('/single-product', postSingleProduct) 
router.post('/mobilNumber', postMobileNumber) 
// router.post('/addProduct', upload.single('image'),  postAddProduct);
router.post('/addProduct',  postAddProduct);
// router.post('/contact', postContact)
router.post('/deletProduct', postDeletProduct)


module.exports = router