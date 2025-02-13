const db = require("../config/database.js");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },
};

module.exports = Product;
