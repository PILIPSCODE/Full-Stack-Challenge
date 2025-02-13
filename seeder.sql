-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS challenge_fullstack;
USE challenge_fullstack;

-- Hapus semua tabel jika sudah ada (Pastikan tidak ada data lama yang tertinggal)
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS transaction_details;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
SET FOREIGN_KEY_CHECKS=1;

-- Buat tabel customers
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level ENUM('Warga', 'Juragan', 'Sultan',"Konglomerat") NOT NULL,
    favorite_menu VARCHAR(255),
    total_transaction INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL
);

-- Buat tabel transactions
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Buat tabel transaction_details
CREATE TABLE transaction_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Masukkan data awal untuk tabel customers
INSERT INTO customers (name, level, favorite_menu, total_transaction) VALUES
('Kris Roher', 'Warga', 'Nasi Goreng Seafood', 0),
('Rina Santoso', 'Juragan', 'Sop Buntut', 0),
('Doni Prasetyo', 'Sultan', 'Ikan Bakar', 0),
('Lisa Anggraini', 'Warga', 'Tongseng Sapi', 0),
('Budi Rahman', 'Juragan', 'Bebek Goreng', 0);

-- Masukkan data awal untuk tabel products
INSERT INTO products (name, price) VALUES
('Nasi Goreng Jamur', 45000),
('Tongseng Sapi', 55000),
('Nasi Gudeg', 35000),
('Nasi Ayam', 40000),
('Nasi Goreng Seafood', 48000),
('Sate Ayam', 38000),
('Sop Buntut', 75000),
('Mie Ayam Bakso', 32000),
('Ikan Bakar', 68000),
('Bebek Goreng', 59000);

-- Masukkan data awal untuk tabel transactions
INSERT INTO transactions (customer_id)
SELECT id FROM customers WHERE is_deleted = FALSE LIMIT 4;

-- Masukkan data awal untuk tabel transaction_details dengan quantity sesuai
INSERT INTO transaction_details (transaction_id, product_id, quantity) VALUES
((SELECT id FROM transactions WHERE customer_id = (SELECT id FROM customers WHERE name = 'Kris Roher')), (SELECT id FROM products WHERE name = 'Nasi Goreng Seafood'), 2),
((SELECT id FROM transactions WHERE customer_id = (SELECT id FROM customers WHERE name = 'Rina Santoso')), (SELECT id FROM products WHERE name = 'Sop Buntut'), 1),
((SELECT id FROM transactions WHERE customer_id = (SELECT id FROM customers WHERE name = 'Doni Prasetyo')), (SELECT id FROM products WHERE name = 'Ikan Bakar'), 3),
((SELECT id FROM transactions WHERE customer_id = (SELECT id FROM customers WHERE name = 'Lisa Anggraini')), (SELECT id FROM products WHERE name = 'Tongseng Sapi'), 1);

-- 🛠️ UPDATE TOTAL TRANSAKSI CUSTOMER SESUAI QUANTITY DAN HARGA PRODUK 🛠️
UPDATE customers c
JOIN (
    SELECT t.customer_id, SUM(td.quantity * p.price) AS total
    FROM transactions t
    JOIN transaction_details td ON t.id = td.transaction_id
    JOIN products p ON td.product_id = p.id
    GROUP BY t.customer_id
) total_trans ON c.id = total_trans.customer_id
SET c.total_transaction = total_trans.total;

ALTER TABLE transactions ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
