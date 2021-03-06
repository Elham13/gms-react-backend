const fast2sms = require("fast-two-sms");
const bcrypt = require("bcryptjs");
const ProductModal = require("../models/product");
const MobileModal = require("../models/mobiles");
const ContactModal = require("../models/contact_us");
const Client = require("../models/clients");
const User = require("../models/users");
const Plan = require("../models/plans");
const { generateToken } = require("../config/auth");

const getHome = async (req, res) => {
  const pro = await ProductModal.find({});
  res.json({ products: pro });
};

const getProducts = async (req, res) => {
  const pageSize = 10;
  const { pageNumber, keyword } = req.query;
  const page = Number(pageNumber) || 1;

  const keywd = keyword
    ? {
        Title: {
          $regex: keyword,
          $options: "i",
        },
      }
    : {};

  const count = await ProductModal.countDocuments({ ...keywd });
  const foundProduct = await ProductModal.find({ ...keywd })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products: foundProduct,
    page,
    pages: Math.ceil(count / pageSize),
  });
};

const getProductsCount = async (req, res) => {
  const pro = await ProductModal.countDocuments({});
  res.json(pro);
};

const getSingleProduct = async (req, res) => {
  const { id, name, mobileNumber } = req.params;
  const product = await ProductModal.findById(id);
  res.json({ message: "success", product: product });
};

const getTopProducts = async (req, res) => {
  const products = await ProductModal.find({}).sort({ Price: -1 }).limit(10);
  res.json(products);
};

const getClients = async (req, res) => {
  const clients = await Client.find({});

  clients.length > 0
    ? res.status(200).json(clients)
    : res.status(202).json({ message: "No clients are created yet" });
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  users.length > 0
    ? res.status(200).json(users)
    : res.status(202).json({ message: "No users are created yet" });
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
  try {
    const product = await ProductModal.create({
      Title: "Sample name",
      Category: "None",
      Description: "Write a description",
      User: req.user._id,
      Price: 0,
      Images: "/images/sample.jpg",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postEditProduct = async (req, res) => {
  const { id, title, desc, price, category, photo } = req.body;

  try {
    const product = await ProductModal.findByIdAndUpdate(id, {
      Title: title,
      Description: desc,
      Price: price,
      Category: category,
      Images: photo,
    });
    res.status(200).json({ message: "Service added successfully", product });
  } catch (error) {
    res.status(202).json({ message: error.message });
  }
};

const postMobileNumber = async (req, res) => {
  const { id, name, mobileNumber } = req.body;

  try {
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
    res.status(201).json({
      message: "Thanks for your interest, We will get back to you ASAP!",
    });
  } catch (error) {
    res.status(203).json({ message: error.message });
  }
};

const postSignup = async (req, res) => {
  const { email, fullName, password } = req.body;
  const existUser = await User.findOne({ email: email.toLowerCase() });

  if (existUser) {
    res
      .status(202)
      .json({ message: "A user with that email is already exist" });
  } else {
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        photo: user.photo,
        token: generateToken(user),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
};

const postDeletProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await ProductModal.deleteOne({ _id: id });
  res.status(200).json({ message: "Product deleted successfuly" });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
      photo: user.photo,
      token: generateToken(user),
    });
    return;
  }
  res.status(202).json({ message: "Invalid email or password" });
};

const postAddClient = async (req, res) => {
  try {
    const newClient = await Client.create({
      clientName: "Enter name",
      brags: "Enter description",
      photo: "",
      user: req.user._id,
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postEditClient = async (req, res) => {
  const { id, clientName, clientBody, photo } = req.body;
  try {
    const client = await Client.findByIdAndUpdate(id, {
      clientName,
      brags: clientBody,
      photo,
    });
    res.status(200).json({ message: "New client successfully added", client });
  } catch (error) {
    res.status(202).json({ message: error.message });
  }
};

const postPlan = async (req, res) => {
  const { businessName, email, name, phoneNo, address } = req.body;

  try {
    await Plan.create({
      businessName,
      email,
      name,
      phoneNo,
      address,
    });
    res.status(201).json({
      message: "Your request has been successfully registered with us",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const postUpdateProfile = async (req, res) => {
  const { id, fullName, email, password, photo } = req.body;

  try {
    const user = await User.findById(id);
    user.fullName = fullName;
    user.email = email;
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }
    if (photo) {
      user.photo = photo;
    }
    const u = await user.save();
    res.status(200).json({
      user: {
        _id: u._id,
        role: u.role,
        fullName: u.fullName,
        email: u.email,
        photo: u.photo,
        token: generateToken(u),
      },
      message: "Profile successfully updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postContactUs = async (req, res) => {
  const { email, mobileNumber, name, message } = req.body;

  await ContactModal.create({
    Name: name,
    MobileNumber: mobileNumber,
    Email: email,
    Message: message,
  });
  res
    .status(201)
    .json({ message: "Thanks for the enquiry we will get back to you ASAP" });
};

module.exports = {
  getHome,
  getSingleProduct,
  getClients,
  getProductsCount,
  getProducts,
  getTopProducts,
  getUsers,
  deleteClient,
  logout,
  postAddProduct,
  postMobileNumber,
  postLogin,
  postSignup,
  postDeletProduct,
  postAddClient,
  postPlan,
  postEditProduct,
  postEditClient,
  postUpdateProfile,
  postContactUs,
};
