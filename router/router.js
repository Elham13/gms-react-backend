const express = require("express");
const router = express.Router();

const {
  getHome,
  getSingleProduct,
  getClients,
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
} = require("./controlers");
const { protect } = require("../config/auth");

router.get("/", getHome);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/getClients", getClients);

router.get("/deleteClient/:id", deleteClient);

router.post("/login", postLogin);
router.post("/logout", logout);
router.post("/signup", postSignup);

router.post("/mobilNumber", postMobileNumber);
router.post("/addProduct", protect, postAddProduct);
router.post("/editProduct", protect, postEditProduct);
router.get("/deletProduct/:id", postDeletProduct);
router.post("/addClient", protect, postAddClient);
router.post("/editClient", protect, postEditClient);
router.post("/plan", postPlan);

module.exports = router;
