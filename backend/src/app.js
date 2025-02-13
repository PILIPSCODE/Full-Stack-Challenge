const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes.js");
const transactionsRoutes = require("./routes/transactions.js");
const productRoutes = require("./routes/productsRoutes.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionsRoutes);

module.exports = app;
