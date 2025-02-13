const Customer = require("../models/customerModels.js");

exports.getAllCustomers = (req, res) => {
  Customer.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getCustomerById = (req, res) => {
  const { id } = req.params;

  Customer.getById(id, (err, customer) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal mengambil data customer", details: err.message });
    }

    if (!customer) {
      return res.status(404).json({ error: "Customer tidak ditemukan" });
    }

    res.status(200).json(customer);
  });
};

exports.createCustomer = (req, res) => {
  Customer.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Customer Added", id: result.insertId });
  });
};

exports.softDeleteCustomer = (req, res) => {
  Customer.softDelete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Customer Soft Deleted" });
  });
};
