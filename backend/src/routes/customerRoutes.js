const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController.js");

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", customerController.createCustomer);
router.delete("/:id", customerController.softDeleteCustomer);

module.exports = router;
