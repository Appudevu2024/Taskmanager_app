const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();



router.post('/register', async (req, res) => {
     try {

        const { name, email, phone, password, confirmpassword } = req.body;
        const phoneNumber = Number(phone);

        if (!name || !email || !phone || !password || !confirmpassword) {
            return res.status(400).json({ error: "All fields are required" })
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords does not match" })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ error: "Email already exist" })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name, email, phone:phoneNumber, password: hashedPassword
        })
        const saved = await newUser.save()
        if (saved) {
            return res.status(200).json({ message: "User created successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });

    }

});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Inavalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Inavalid credentials' });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        res.json({ token })
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
})


module.exports = router;



















