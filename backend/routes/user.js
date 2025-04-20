const express = require('express');
const router = express.Router();
const register = require('../controllers/authentication/register');
const login = require('../controllers/authentication/login');
const forgetPass = require('../controllers/authentication/forgetPass');
const verifyOtp = require('../controllers/authentication/verifyOtp');
const updatePass = require('../controllers/authentication/updatePass');
const liIon = require('../controllers/battery_model/lithium_ion');

router.post('/register', register);
router.post('/login', login);
router.post('/forgetPass', forgetPass);
router.post('/verifyOtp', verifyOtp);
router.post('/updatePass', updatePass);
router.post('/lithiumIon', liIon);

module.exports = router;