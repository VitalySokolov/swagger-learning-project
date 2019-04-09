const { Product, validateProduct } = require('../models/product');

/**
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getProducts = async () => {
  const products = await Product.find();

  return {
    status: 200,
    data: products,
  };
};

/**
 * @param {Object} options
 * @param {Object} options.body Product object that needs to be added
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addProduct = async (options) => {
  const { error } = validateProduct(options.body);
  if (error) {
    return {
      status: 400,
      data: `Product is not valid - ${error.details[0].message}`,
    };
  }

  let product = new Product({
    title: options.body.title,
    amount: options.body.amount,
    reviews: options.body.reviews || [],
    lastModifiedDate: Date.now(),
  });

  product = await product.save();

  return {
    status: 201,
    data: product,
  };
};

/**
 * @param {Object} options
 * @param {String} options.productId ID of product that needs to be fetched
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getProductById = async (options) => {
  const product = await Product.findById(options.productId);

  if (!product) {
    return {
      status: 404,
      data: 'The product with the given ID was not found.',
    };
  }

  return {
    status: 200,
    data: product,
  };
};

/**
 * @param {Object} options
 * @param {String} options.productId ID of the product that needs to be deleted
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteProduct = async (options) => {
  const product = await Product.findByIdAndRemove(options.productId);

  if (!product) {
    return {
      status: 404,
      data: 'The product with the given ID was not found.',
    };
  }

  return {
    status: 200,
    data: 'deleteProduct ok!',
  };
};

/**
 * @param {Object} options
 * @param {String} options.productId ID of product which reviews need to be fetched
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getProductReviewsById = async (options) => {
  const product = await Product.findById(options.productId);

  if (!product) {
    return {
      status: 404,
      data: 'The product with the given ID was not found.',
    };
  }

  return {
    status: 200,
    data: product.reviews,
  };
};

