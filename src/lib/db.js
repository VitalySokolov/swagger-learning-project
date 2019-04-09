const mongoose = require('mongoose');
const config = require('../lib/config');
const logger = require('../lib/logger');

const log = logger(config.logger);

module.exports = () => {
  mongoose.connect('mongodb://localhost/learningProject')
    .then(() => log.debug('Connected to MongoDB...'))
    .catch((err) => log.error('Could not connect to MongoDB...', err));
};
