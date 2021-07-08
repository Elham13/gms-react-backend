const express = require("express");
const router = express.Router();

const {
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
  postSignup,
  postDeletProduct,
  postLogin,
  postAddClient,
  postPlan,
  postEditProduct,
  postEditClient,
  postUpdateProfile,
  postContactUs,
} = require("./controlers");
const { protect } = require("../config/auth");

router.get("/", getHome);
router.get("/getProducts", getProducts);
router.get("/getProductsCount", getProductsCount);
router.get("/getTopProducts", getTopProducts);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/getClients", getClients);
router.get("/getUsers", getUsers);
router.get("/deleteClient/:id", deleteClient);
router.get("/deletProduct/:id", postDeletProduct);

router.post("/login", postLogin);
router.post("/logout", logout);
router.post("/signup", postSignup);
router.post("/addProduct", protect, postAddProduct);
router.post("/editProduct", protect, postEditProduct);
router.post("/mobilNumber", postMobileNumber);
router.post("/addClient", protect, postAddClient);
router.post("/editClient", protect, postEditClient);
router.post("/plan", postPlan);
router.post("/updateProfile", protect, postUpdateProfile);
router.post("/contactUs", postContactUs);

module.exports = router;
