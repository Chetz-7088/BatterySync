const express = require('express');
const router = express.Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const forgetPass = require('../controllers/forgetPass');
const verifyOtp = require('../controllers/verifyOtp');
const updatePass = require('../controllers/updatePass');

router.post('/register', register);
router.post('/login', login);
router.post('/forgetPass', forgetPass);
router.post('/verifyOtp', verifyOtp);
router.post('/updatePass', updatePass);

module.exports = router;