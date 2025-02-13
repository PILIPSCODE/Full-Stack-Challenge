const db = require("../config/database.js");

const Customer = {
  // Ambil semua customer yang belum dihapus
  getAll: (callback) => {
    db.query("SELECT * FROM customers WHERE is_deleted = FALSE", callback);
  },

  // Ambil detail customer + semua produk yang pernah dipesan
  getById: (id, callback) => {
    const sql = `
      SELECT 
        c.id AS customer_id,
        c.name AS customer_name,
        c.level,
        c.favorite_menu,
        c.total_transaction,
        p.id AS product_id,
        p.price AS product_price,
        p.name AS product_name,
        td.quantity
      FROM customers c
      LEFT JOIN transactions t ON c.id = t.customer_id
      LEFT JOIN transaction_details td ON t.id = td.transaction_id
      LEFT JOIN products p ON td.product_id = p.id
      WHERE c.id = ? AND c.is_deleted = FALSE
    `;

    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, null); // Jika customer tidak ditemukan
      }

      // Buat objek customer dengan daftar produk dalam array
      const customer = {
        customer_id: results[0].customer_id,
        customer_name: results[0].customer_name,
        level: results[0].level,
        favorite_menu: results[0].favorite_menu,
        total_transaction: results[0].total_transaction,
        products: [],
      };

      results.forEach((row) => {
        if (row.product_id) {
          customer.products.push({
            product_id: row.product_id,
            product_name: row.product_name,
            quantity: row.quantity,
            price: row.product_price,
          });
        }
      });

      callback(null, customer);
    });
  },

  // Tambah customer baru
  create: (data, callback) => {
    const sql =
      "INSERT INTO customers (name, level, favorite_menu, total_transaction) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [data.name, data.level, data.favorite_menu, data.total_transaction],
      callback
    );
  },

  // Soft delete customer
  softDelete: (id, callback) => {
    db.query(
      "UPDATE customers SET is_deleted = TRUE WHERE id = ?",
      [id],
      callback
    );
  },
};

module.exports = Customer;
