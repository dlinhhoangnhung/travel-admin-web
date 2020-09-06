const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi'); // import Joi
const PasswordComplexity = require('joi-password-complexity');
const User = require('../models/User')

/* ----------------------------- SIGN UP METHOD ----------------------------- */

router.post('/signup', async (req, res) => {

    const { error } = validateUser(req.body); // lay ket qua tu function validateTour
    if (error) //Neu ket qua ton tai loi, thi tra loi message 
        return res.status(404).send(error.details[0].message);//rs.error.details[0].message => thong bao loi

    //CHECK USER STATUS
    const user = await User.findOne({ email: req.body.email })
    if (user)
        return res.status(404).send({ auth: "false", message: 'The email have been exist' });

    try {
        const { phone, email, password } = req.body; // Get user information in req body
        let avt = "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";
        const user = new User({ phone: phone, email: email, username: email, password: password, lastname: 'Trống', firstname: "Trống", avatar: avt, address: "Chưa nhập" }); //Create new user object
        user.password = await user.encryptPassword(password); // Encrypt user pasword
        await user.save(); //Push user infor to database

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' }); // create login token
        res.status(200).json({ auth: true, token, uid: user.id }) //res with auth status - token
    } catch (e) {
        console.log(e);
        res.status(500).send({ auth: "false", message: 'There was a problem signup' });
    }
})

/* ----------------------------- SIGN IN METHOD ----------------------------- */

router.post('/signin', async (req, res) => {

    const { error } = validateSignIn({ "email": req.body.email, "password": req.body.password }); // lay ket qua tu function validateTour
    if (error) //Neu ket qua ton tai loi, thi tra loi message 
        return res.status(404).send(error.details[0].message);//rs.error.details[0].message => thong bao loi

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(404).send(`The email doesn't exist`);

        const validatePassword = await user.validatePassword(req.body.password, user.password); //check password
        // If password invalid
        if (!validatePassword)
            return res.status(401).send({ auth: false, token: null }); // return auth false
        // If password valid
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "365d" });
        res.status(200).json({ auth: true, token, uid: user.id }); //return auth true + token
    } catch (e) {
        console.log(e);
        res.status(500).send('There was a problem signin');
    }
})
/* -------------------------------------------------------------------------- */
router.get('/me', function (req, res) {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        let id = decoded.id
        let authStatus = decoded.exp - decoded.iat <= 0 ? false : true;
        res.status(200).json({
            auth: authStatus, token,
            uid: id
        });
    });
});
/* ----------------------------- SIGN OUT METHOD ---------------------------- */

router.get('/signout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null,
        current_user: null
    })
})

/* -------------------- Validate user with full attribute ------------------- */

function validateUser(user) {

    const complexityOptions = {
        min: 6,
        max: 24,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
        /* 
           Min & Max not considered in the count. 
           Only lower, upper, numeric and symbol. 
           requirementCount could be from 1 to 4 
           If requirementCount=0, then it takes count as 4
       */
    };
    const schema = Joi.object( // tao 1 doi tuong Joi 
        {
            phone: Joi.number().required(),
            email: Joi.string().max(256).email().required(),
            password: PasswordComplexity(complexityOptions)
            // thuoc tinh can kiem tra co valid hay k?
        });
    return schema.validate(user); // tra ve ket qua kiem tra
}

/* ---------------- Validate user without username attribute ---------------- */

function validateSignIn(email, password) {

    const complexityOptions = {
        min: 6,
        max: 24,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4

    };
    const schema = Joi.object( // tao 1 doi tuong Joi 
        {
            email: Joi.string().max(256).email().required(),
            password: PasswordComplexity(complexityOptions)
            // thuoc tinh can kiem tra co valid hay k?
        });
    return schema.validate(email, password); // tra ve ket qua kiem tra
}


module.exports = router;