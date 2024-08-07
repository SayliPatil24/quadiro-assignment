const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Car = require('../models/Car');

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'yourJWTSecret');
    res.json({ token });
};

exports.viewCars = async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
};
