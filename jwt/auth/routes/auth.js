const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Let's validate the data before we use it
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the DB
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
// Let's validate the data before we use it
const { error } = loginValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);
// Check if the email already in the DB
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email or Password is wrong');
// Password is Correct
const validPassword = await bcrypt.compare(req.body.password, user.password);
if(!validPassword) return res.status(400).send('Invalid password');
// Create and assign JWT
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);
});

module.exports = router;