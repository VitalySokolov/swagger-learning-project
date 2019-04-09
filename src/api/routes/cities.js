const express = require('express');
const cities = require('../services/cities');

const router = new express.Router();

/**
 * Get all cities
 */
router.get('/', async (req, res) => {
  const result = await cities.getAllCities();
  res.status(result.status).send(result.data);
});

/**
 * Add a new city
 */
router.post('/', async (req, res) => {
  const options = {
    body: req.body,
  };

  const result = await cities.addCity(options);
  res.status(result.status).send(result.data);
});

/**
 * Returns a single city
 */
router.get('/:cityId', async (req, res) => {
  const options = {
    cityId: req.params['cityId']
  };

  const result = await cities.getCityById(options);
  res.status(result.status).send(result.data);
});

/**
 * Updates a city
 */
router.put('/:cityId', async (req, res) => {
  const options = {
    cityId: req.params['cityId'],
    body: req.body,
  };

  const result = await cities.updateCity(options);
  res.status(result.status).send(result.data);
});

/**
 * Deletes a city
 */
router.delete('/:cityId', async (req, res, next) => {
  const options = {
    cityId: req.params['cityId']
  };

  const result = await cities.deleteCity(options);
  res.status(result.status).send(result.data);
});

module.exports = router;
