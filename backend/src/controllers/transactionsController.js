const db = require("../config/db.js");
exports.createTransaction = async (req, res) => {
  const { customer_id, products } = req.body;

  if (!customer_id || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Data tidak lengkap!" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert transaksi baru
    const [transactionResult] = await connection.query(
      `INSERT INTO transactions (customer_id) VALUES (?)`,
      [customer_id]
    );
    const transaction_id = transactionResult.insertId;

    let totalPrice = 0;

    // Insert detail transaksi dan hitung total harga transaksi
    for (const { product_id, quantity } of products) {
      // Ambil harga produk dari database
      const [[product]] = await connection.query(
        `SELECT price FROM products WHERE id = ?`,
        [product_id]
      );

      if (!product) {
        throw new Error(`Produk dengan ID ${product_id} tidak ditemukan.`);
      }

      const productPrice = product.price;
      totalPrice += productPrice * quantity;

      // Masukkan ke transaction_details
      await connection.query(
        `INSERT INTO transaction_details (transaction_id, product_id, quantity) VALUES (?, ?, ?)`,
        [transaction_id, product_id, quantity]
      );
    }

    // Commit transaksi
    await connection.commit();

    // Update total transaksi pada tabel customers dengan menambah total harga transaksi
    await connection.query(
      `UPDATE customers SET total_transaction = total_transaction + ? WHERE id = ?`,
      [totalPrice, customer_id]
    );

    res.status(201).json({
      message: "Transaksi berhasil dibuat!",
      transaction_id,
      total_transaction_price: totalPrice,
    });
  } catch (error) {
    await connection.rollback();
    res
      .status(500)
      .json({ error: "Gagal membuat transaksi", details: error.message });
  } finally {
    connection.release();
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const [transactions] = await db.query(`  -- 🟢 Tidak perlu .promise()
      SELECT t.id AS transaction_id, t.customer_id, c.name AS customer_name, 
             td.product_id, p.name AS product_name, td.quantity, 
             COALESCE(t.created_at, NOW()) AS created_at
      FROM transactions t
      JOIN customers c ON t.customer_id = c.id
      JOIN transaction_details td ON t.id = td.transaction_id
      JOIN products p ON td.product_id = p.id
      ORDER BY created_at DESC
    `);

    // Format hasil agar setiap transaksi mengelompokkan produk yang dipesan
    const groupedTransactions = transactions.reduce((acc, row) => {
      const {
        transaction_id,
        customer_id,
        customer_name,
        created_at,
        product_id,
        product_name,
        quantity,
      } = row;
      let transaction = acc.find((t) => t.transaction_id === transaction_id);

      if (!transaction) {
        transaction = {
          transaction_id,
          customer_id,
          customer_name,
          created_at,
          products: [],
        };
        acc.push(transaction);
      }

      transaction.products.push({ product_id, product_name, quantity });
      return acc;
    }, []);

    res.json(groupedTransactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal mengambil transaksi", details: error.message });
  }
};
