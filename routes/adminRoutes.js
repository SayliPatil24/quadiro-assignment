const express = require('express');
const router = express.Router();
const { adminLogin, createCar, getCars, updateCar, deleteCar, getDashboardStats } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/car', createCar);
router.get('/cars', getCars);
router.put('/car/:id', updateCar);
router.delete('/car/:id', deleteCar);
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;
