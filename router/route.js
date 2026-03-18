const express = require("express");
const productController = require("../controllers/AddProductController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const RegisterShopcontroller = require("../controllers/RegisterShopcontroller");
const wholsalejwtMiddleware = require("../middlewares/wholsalejwtMiddleware");
const cartController = require("../controllers/CartController");
const BillController = require("../controllers/BillController");
const dashboardController = require('../controllers/dashboardController')
const adminjwtMidleware  = require('../middlewares/adminMiddleware')


const router = express.Router();

router.post("/api/registerUser", userController.registerUser);
router.post("/api/loginUser", userController.loginUser);
router.post("/api/googleLogin", userController.googleAuth);

// wholsaler routes

router.post(
  "/api/wholsaleRegister",
  multerMiddleware.single("shopImage"),
  RegisterShopcontroller.wholsaleRegister,
);
router.post("/api/wholsaleLogin", RegisterShopcontroller.wholsaleLogin);
router.post(
  "/api/addproducts",
  wholsalejwtMiddleware,
  multerMiddleware.single("uploadImage"),
  productController.addProduct,
);

router.get("/api/getShops", RegisterShopcontroller.getShops);
router.get(
  "/api/viewAllShops",
  jwtMiddleware,
  RegisterShopcontroller.viewAllShops,
);
router.get("/api/getProducts/:id",jwtMiddleware, productController.getProducts);
router.post(
  "/api/AddCartProducts",
  jwtMiddleware,
  cartController.AddCartProducts,
);
router.get(
  "/api/GetCartProducts",
  jwtMiddleware,
  cartController.GetCartProducts,
);

router.put(
  "/api/inCreaseQuantity",
  jwtMiddleware,
  cartController.inCreaseQuantity,
);
router.put(
  "/api/decreaseQuantity",
  jwtMiddleware,
  cartController.decreaseQuantity,
);
router.delete("/api/deleteCart", jwtMiddleware, cartController.deleteCart);

router.post("/api/showBill", jwtMiddleware, BillController.showBill);
// router.get('/api/getBill/:id',BillController.getBill)

router.get("/api/getBill", wholsalejwtMiddleware, BillController.getBill);

router.delete('/api/deleteBill/:id',wholsalejwtMiddleware,BillController.deleteBill)

router.get("/api/dashboardWhol",wholsalejwtMiddleware,dashboardController.getDashboard)


router.post("/api/makePayment",jwtMiddleware, BillController.makePayment);

router.get('/api/wholsaler/getUpdateProducts',wholsalejwtMiddleware,productController.getUpdateProducts)

router.put('/api/wholsaler/editProducts/:id',wholsalejwtMiddleware,multerMiddleware.single('uploadImage'),productController.editProducts)

router.get('/api/admin/dashboard',dashboardController.adminDashboard)
router.get('/api/admin/getUserAdmin',adminjwtMidleware,userController.getUsersAdmin)
router.get('/api/admin/getWholsalersAdmin',adminjwtMidleware,RegisterShopcontroller.getWholsalersAdmin)
router.put('/api/admin/updateAdmin',adminjwtMidleware,multerMiddleware.single('uploadImg'),userController.updateAdmin)

// router.get('/verify-payment', BillController.verifyPayment)
// router.get('/get-bills', wholsalejwtMiddleware, BillControllerillController.getBills)


module.exports = router;
