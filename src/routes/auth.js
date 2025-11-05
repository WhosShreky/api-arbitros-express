const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @route POST /api/auth/register
 * @desc Register a new arbitro (proxied to Spring API)
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 */
router.post('/login', authController.login);

module.exports = router;
