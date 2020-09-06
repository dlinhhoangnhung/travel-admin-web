const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.use(express.json())

/* ----------------------------------------------------------------------------- */

/* ----------------------------- Get profile by id ----------------------------- */
router.get('/:id', async (req, res) => {
    try {
        const userProfile = await User.findById(req.params.id);
        res.json(userProfile);
    } catch (e) {
        res.json({ message: e });
    }
})

router.get('/', async (req, res) => {
    try {
        const userProfile = await User.find();
        res.json(userProfile);
    } catch (e) {
        res.json({ message: e });
    }
})

/* --------------------------- Update user profile -------------------------- */
router.put('/:id', async (req, res) => {
    try {
        const updateProfile = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    birthday: req.body.birthday,
                    address: req.body.address
                }
            });
        return res.json(updateProfile);
    } catch (e) {
        res.json({ message: e });
    }
})

/* ------------------------------ Update avatar ----------------------------- */
router.put('/update-avatar/:id', async (req, res) => {
    try {
        const updateAvatar = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    avatar: req.body.avatar
                }
            }
        );
        return res.json(updateAvatar)
    } catch (e) {
        res.json({ message: e })

    }
})
router.put('/update-profile/:id', async (req, res) => {
    try {
        const updateAvatar = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }
            }
        );
        return res.json(updateAvatar)
    } catch (e) {
        res.json({ message: e })

    }
}
)
module.exports = router;


