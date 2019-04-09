const { City, validateCity } = require('../models/city');

/**
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllCities = async () => {
  const cities = await City.find().sort('name');

  return {
    status: 200,
    data: cities,
  };
};

/**
 * @param {Object} options
 * @param {Object} options.body City object that needs to be added
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addCity = async (options) => {
  const { error } = validateCity(options.body);
  if (error) {
    return {
      status: 400,
      data: `City data is not valid - ${error.details[0].message}`,
    };
  }

  let city = new City({
    name: options.body.name,
    country: options.body.country,
    capital: options.body.capital || false,
    location: options.body.location,
    lastModifiedDate: Date.now(),
  });
  city = await city.save();

  return {
    status: 201,
    data: city,
  };
};

/**
 * @param {Object} options
 * @param {String} options.cityId ID of city to return
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getCityById = async (options) => {
  const city = await City.findById(options.cityId);

  if (!city) {
    return {
      status: 404,
      data: 'The city with the given ID was not found.',
    };
  }

  return {
    status: 200,
    data: city,
  };
};

/**
 * @param {Object} options
 * @param {String} options.cityId ID of city that needs to be updated
 * @param {Object} options.body City object that needs to be updated
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateCity = async (options) => {
  const { error } = validateCity(options.body);
  if (error) {
    return {
      status: 400,
      data: `City data is not valid - ${error.details[0].message}`,
    };
  }

  const city = await City.findByIdAndUpdate(options.cityId,
    {
      name: options.body.name,
      country: options.body.country,
      capital: options.body.capital || false,
      location: options.body.location,
      lastModifiedDate: Date.now(),
    },
    { new: true });

  if (!city) return {
    status: 404,
    data: 'The city with the given ID was not found.',
  };

  return {
    status: 200,
    data: city,
  };
};

/**
 * @param {Object} options
 * @param {String} options.cityId City id to delete
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteCity = async (options) => {
  const city = await City.findByIdAndRemove(options.cityId);

  if (!city) return {
    status: 404,
    data: 'The city with the given ID was not found.',
  };

  return {
    status: 200,
    data: 'deleteCity ok!',
  };
};
