const express = require('express');

const connection =require("../config/db");
const router = express.Router();


router.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
  
    connection.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Product added successfully', productId: results.insertId });
      }
    );
  });

  router.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ products: results });
    });
  });

  router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
  
    connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({ product: results[0] });
    });
  });
  

  router.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
  
    connection.query(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, productId],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        res.json({ message: 'Product updated successfully' });
      }
    );
  });

  router.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
  
    connection.query('DELETE FROM products WHERE id = ?', [productId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({ message: 'Product deleted successfully' });
    });
  });
  
  module.exports=router;
