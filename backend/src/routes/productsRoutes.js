const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers.js");

router.get("/", productController.getAllProducts);

module.exports = router;
