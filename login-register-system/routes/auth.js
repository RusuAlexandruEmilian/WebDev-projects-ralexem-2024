const express = require('express');
const authController = require('../controllers/auth')
const loginController = require('../controllers/login_controller')

const router = express.Router();

router.post('/register', authController.register);

router.post('/', loginController.login);

module.exports = router;