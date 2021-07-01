const express = require("express");
const router = express.Router();

const {
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
  postSignup,
  postContact,
  postDeletProduct,
  postLogin,
  postProduct,
  postAddClient,
  postPlan,
} = require("./controlers");

router.get("/", getHome);
// router.get('/admin', ensureAuthenticated, getAdmin);
// router.get('/login', forwardAuthenticated, getLogin);
// router.get('/about', getAboutUs);
// router.get('/services', getSerivces);
// router.get('/products', getProducts);
// router.get('/contact', getContactUs);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/getClients", getClients);

router.delete("/deleteClient/:id", deleteClient);

router.post("/login", postLogin);
router.post("/logout", logout);
router.post("/signup", postSignup);

// router.post('/single-product', postSingleProduct)
router.post("/mobilNumber", postMobileNumber);
// router.post('/addProduct', upload.single('image'),  postAddProduct);
router.post("/addProduct", postAddProduct);
router.post("/product", postProduct);
// router.post('/contact', postContact)
router.post("/deletProduct", postDeletProduct);
router.post("/addClient", postAddClient);
router.post("/plan", postPlan);

// router.post("/upload", function (req, res) {
//   let sampleFile;
//   let uploadPath;
//   console.log("Body: ", req.body);
//   console.log("Files: ", req.files);
//   // console.log("REq: ", req);

//   // if (!req.files || Object.keys(req.files).length === 0) {
//   //   console.log("No file selected");
//   //   return;
//   // }

//   // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   // sampleFile = req.files.sampleFile;
//   // uploadPath = __dirname + "" + sampleFile.name;

//   // // Use the mv() method to place the file somewhere on your server
//   // sampleFile.mv(uploadPath, function (err) {
//   //   if (err) {
//   //     console.log("Path failure: ", err);
//   //     return res.status(500).send(err);
//   //   }

//   //   console.log("Success");
//   //   res.send("File uploaded!");
//   // });
// });

module.exports = router;
