const express = require('express');
const products = require('../services/products');

const router = new express.Router();

/**
 * Returns list of products
 */
router.get('/', async (req, res) => {
  const result = await products.getProducts();
  res.status(result.status).send(result.data);
});

/**
 * Add a new product
 */
router.post('/', async (req, res) => {
  const options = {
    body: req.body,
  };

  const result = await products.addProduct(options);
  res.status(result.status).send(result.data);
});

/**
 * Find product by ID
 */
router.get('/:productId', async (req, res) => {
  const options = {
    productId: req.params['productId']
  };

  const result = await products.getProductById(options);
  res.status(result.status).send(result.data);
});

/**
 * Delete product by ID
 */
router.delete('/:productId', async (req, res) => {
  const options = {
    productId: req.params['productId']
  };

  const result = await products.deleteProduct(options);
  res.status(result.status).send(result.data);
});

/**
 * Find product reviews by product ID
 */
router.get('/:productId/reviews', async (req, res) => {
  const options = {
    productId: req.params['productId']
  };

  const result = await products.getProductReviewsById(options);
  res.status(result.status).send(result.data);
});

module.exports = router;
