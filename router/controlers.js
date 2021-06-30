const fast2sms = require("fast-two-sms");
const ProductModal = require("../models/product");
const MobileModal = require("../models/mobiles");
const ContactModal = require("../models/contact_us");
const Client = require("../models/clients");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/auth");

const getHome = async (req, res) => {
  const foundProduct = await ProductModal.find({});
  const foundProduct1 = [];
  foundProduct.map((product) => {
    const newProduct = {
      _id: product._id,
      Images: product.Images[0],
      Title: product.Title,
      Category: product.Category,
      Description: product.Description,
      Price: product.Price,
      CreatedAt: product.CreatedAt,
    };
    foundProduct1.push(newProduct);
  });
  res.json({ products: foundProduct1 });
};

const getLogin = (req, res) => {
  res.render("login");
};

const getAdmin = async (req, res) => {
  const pro = await ProductModal.find({});
  res.render("admin", { products: pro });
};

const getAboutUs = (req, res) => {
  res.render("pages/about_us");
};

const getSerivces = (req, res) => {
  res.render("pages/services");
};

const getProducts = async (req, res) => {
  const pro = await ProductModal.find({});
  res.render("pages/products", { products: pro });
};

const getContactUs = (req, res) => {
  res.render("pages/contact_us");
};

const getSingleProduct = async (req, res) => {
  const { id, name, mobileNumber } = req.params;
  console.log("Body: ", req.body);
  const product = await ProductModal.findById(id);
  res.json({ message: "success", product: product });
};

const getClients = async (req, res) => {
  const clients = await Client.find({});

  clients.length > 0
    ? res.status(200).json(clients)
    : res.status(202).json({ message: "No clients are created yet" });
};

const deleteClient = async (req, res) => {
  const response = await Client.deleteOne({ _id: req.params.id });
  response.ok === 1
    ? res.status(202).json({ message: "Item deleted successfully" })
    : res.status(500).json({ message: "Something went wrong!" });
};

const logout = async (req, res) => {
  req.user = null;
  res.json({ message: "Successfully logged out" });
};

const postAddProduct = async (req, res) => {
  const { id, title, category, desc, price, photo } = req.body;

  if (id === "") {
    const p = await new ProductModal({
      Title: title,
      Category: category,
      Description: desc,
      Price: price,
      Images: photo,
    });
    await p.save();
    res.json({ message: "Service added succesfully" });
  } else {
    await ProductModal.findByIdAndUpdate(id, {
      Title: title,
      Category: category,
      Description: desc,
      Price: price,
      Images: photo,
    });
    res.json({ message: "Service updated succesfully" });
  }
};

const postSingleProduct = async (req, res) => {
  const { productId } = req.body;
  const product = await ProductModal.findById({ _id: productId });
  if (product) {
    res.render("single-product", { product: product });
  }
};

const postMobileNumber = async (req, res) => {
  const { id, name, mobileNumber } = req.body;
  const product = await ProductModal.findById({ _id: id });
  const m = await new MobileModal({
    name: name,
    mobileNumber: mobileNumber,
    product: product,
  });
  // const smsRes = await fast2sms.jsonMessage({
  //     authorization: process.env.SMS_API_KEY,
  //     message: `Hi dear ${name} Please give a call to Mr Chary +919985330008 and get the best deal from Global Marketing Solutions`,
  //     numbers: [mobileNumber]

  // })
  await m.save();
  res.json({ message: "Successfuly added mobile number" });
};

const postSignup = async (req, res) => {
  const { email, fullName, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({ message: "A user with that email is already exist" });
  } else {
    const user = new User({
      fullName,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    const createdUser = await user.save();
    res.json({
      message: "You are now registered successfully",
      user: createdUser,
    });
  }
};

const postContact = async (req, res) => {
  const { name, phoneNumber, email, message } = req.body;
  const newContact = await new ContactModal({
    Name: name,
    MobileNumber: phoneNumber,
    Email: email,
    Message: message,
  });

  await newContact.save();
  res.redirect("/contact");
};

const postDeletProduct = async (req, res) => {
  const { id } = req.body;
  await ProductModal.findByIdAndDelete(id);
  res.json({ message: "Product deleted successfuly" });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        user,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
};

const postProduct = async (req, res) => {
  console.log(req.files);
};

const postAddClient = async (req, res) => {
  const { id, clientName, clientBody, photo } = req.body;

  if (!id) {
    const newClient = await Client.create({
      clientName,
      brags: clientBody,
      photo,
    });

    res.status(201).json({ message: "Client created successfully", newClient });
    return;
  }

  const updatedClient = await Client.updateOne({ _id: id }, {});
};

module.exports = {
  getHome,
  getAdmin,
  getLogin,
  getAboutUs,
  getSerivces,
  getProducts,
  getContactUs,
  getSingleProduct,
  getClients,
  deleteClient,
  logout,
  postAddProduct,
  postSingleProduct,
  postMobileNumber,
  postLogin,
  postSignup,
  postContact,
  postDeletProduct,
  postProduct,
  postAddClient,
};
