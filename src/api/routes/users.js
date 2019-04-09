const express = require('express');
const users = require('../services/users');

const router = new express.Router();

/**
 * Get all users
 */
router.get('/', async (reqtest, res) => {
  const result = await users.getAllUsers();
  res.status(result.status).send(result.data);
});

/**
 * This can only be done by the admin user.
 */
router.delete('/:userId', async (req, res) => {
  const options = {
    userId: req.params['userId']
  };

  const result = await users.deleteUser(options);
  res.status(result.status).send(result.data);
});

module.exports = router;
