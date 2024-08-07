const express = require('express');
const router = express.Router();
const { userLogin, viewCars } = require('../controllers/userController');

router.post('/login', userLogin);
router.get('/cars', viewCars);

module.exports = router;
