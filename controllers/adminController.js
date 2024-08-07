const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Car = require('../models/Car');

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send('Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: admin._id }, 'yourJWTSecret');
    res.json({ token });
};

exports.createCar = async (req, res) => {
    const { name, manufacturingYear, price } = req.body;
    const newCar = new Car({ name, manufacturingYear, price });
    await newCar.save();
    res.json(newCar);
};

exports.getCars = async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, manufacturingYear, price } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(id, { name, manufacturingYear, price }, { new: true });
    res.json(updatedCar);
};

exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.json({ message: 'Car deleted' });
};

exports.getDashboardStats = async (req, res) => {
    const totalCars = await Car.countDocuments();
    res.json({ totalCars });
};
