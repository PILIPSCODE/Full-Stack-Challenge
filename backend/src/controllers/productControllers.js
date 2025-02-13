const Product = require("../models/productModels.js");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal mengambil produk", details: err.message });
    }

    res.status(200).json({ products: results });
  });
};
