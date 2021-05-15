const fast2sms = require('fast-two-sms');
const ProductModal = require('../models/product');
const MobileModal = require('../models/mobiles');
const ContactModal = require('../models/contact_us');

const getHome = async (req, res) => {
    const foundProduct = await ProductModal.find({});
    res.send({products: foundProduct})
}
 
const getLogin = (req, res) => {
    res.render('login')
}

const getAdmin = async (req, res) => {
    const pro = await ProductModal.find({});
    res.render('admin', {products: pro})
}

const getAboutUs = (req, res) => {
    res.render('pages/about_us');
}

const getSerivces = (req, res) => {
    res.render('pages/services');
}

const getProducts = async (req, res) => {
    const pro = await ProductModal.find({});
    res.render('pages/products', {products: pro});
}

const getContactUs = (req, res) => {
    res.render('pages/contact_us');
}

const getSingleProduct = async (req, res) => {
    const {id} = req.params;
    const product = await ProductModal.findById(id)
    res.render('pages/single_product', {product});
}

const logout = async (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

const postAddProduct = async (req, res) => {
    const {
        id,
        title, 
        category, 
        desc, 
        price, 
        photo, 
    } = req.body;

    if(id === ''){
        const p = await new ProductModal({
            Title: title,
            Category: category,
            Description: desc,
            Price: price,
            Image: photo,
        });
        await p.save();
        res.send({message: "Service added succesfully"})
    }else{
        await ProductModal.findByIdAndUpdate(id, {
            Title: title,
            Category: category,
            Description: desc,
            Price: price,
            Image: photo,
        })
        res.send({message: "Service updated succesfully"})
    }
}

const postSingleProduct = async (req, res) => {
    const {productId} = req.body;
    const product = await ProductModal.findById({_id: productId});
    if(product){
        res.render('single-product', {product: product})
    }
}

const postMobileNumber = async (req, res) => {
    const {id, name, mobileNumber} = req.body;
    const product = await ProductModal.findById({_id: id});
    const m = await new MobileModal({name: name, mobileNumber: mobileNumber, product: product})
    // const smsRes = await fast2sms.sendMessage({
    //     authorization: process.env.SMS_API_KEY,
    //     message: `Hi dear ${name} Please give a call to Mr Chary +919985330008 and get the best deal from Global Marketing Solutions`,
    //     numbers: [mobileNumber]
        
    // })
    await m.save();
    res.send({message: "Successfuly added mobile number"})
}

const postLogin = (req, res) => {
    const {email, password} = req.body;
}

const postSignup = (req, res) => {
    const {email, fullName, password} = req.body;
}


const postContact = async (req, res) => {
    const {name, phoneNumber, email, message} = req.body;
    const newContact = await new ContactModal({
        Name: name,
        MobileNumber: phoneNumber,
        Email: email,
        Message: message,
    });

    await newContact.save();
    res.redirect('/contact');
}

const postDeletProduct = async (req, res) => {
    const {id} = req.body; 
    await ProductModal.findByIdAndDelete(id);
    res.send({message: "Product deleted successfuly"});
}


module.exports = {
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
    postLogin,
    postSignup,
    postContact,
    postDeletProduct,
}