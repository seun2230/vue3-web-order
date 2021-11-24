const express = require('express');
const router = express.Router();
const { login, check } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/login', login);
router.get('/', verifyToken, check);

module.exports = router;