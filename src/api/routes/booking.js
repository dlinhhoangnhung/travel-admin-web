const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Joi = require("@hapi/joi"); // import Joi
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tour = require("../models/Tour");

router.use(express.json());

/* -------------------------------- GET CART -------------------------------- */

router.get("/get-cart", async (req, res) => {

    var token = req.headers["authorization"];

    if (!token)
        return res.status(401).send({ auth: false, message: "No token provided." });
    var uid;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        uid = decoded.id;
    });

    try {
        const booking = await Booking.findOne({ uid: uid, status: "in-cart" });
        res.json({ quantity: !booking.booking_items.length ? 0 : booking.booking_items.length, data: booking });
    } catch (e) {
        res.json({ message: e });
    }
});

router.get("/get-cart-total/:cartid", async (req, res) => {
    try {
        var total = 0;
        const booking = await Booking.findById(req.params.cartid);
        for (let i = 0; i < booking.booking_items.length; i++) { //!Truy xuất đến từng item trong cart
            let tour = await Tour.findById(booking.booking_items[i].tour_id);
            total += parseInt(booking.booking_items[i].quantity, 10) * (booking.booking_items[i].type == "adult" ? tour.adult_price : tour.child_price);
        }
        res.json({ total });
    } catch (e) {
        res.json({ message: e });
    }
});
/* -------------------------------------------------------------------------- */

router.get("/delete-cart", async (req, res) => {
    var token = req.headers["authorization"];
    if (!token)
        return res.status(401).send({ auth: false, message: "No token provided." });

    var id;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        id = decoded.id;
    });
    await (await Booking.findOneAndDelete({ uid: id, status: "in-cart" })).save()

});

/* -------------------------- ADD NEW ITEM TO CART -------------------------- */
router.get("/add-item-to-cart/:tourid/:type/:quantity", async (req, res) => {
    var token = req.headers["authorization"];

    if (!token)
        return res.status(401).send({ auth: false, message: "No token provided." });
    var uid;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        uid = decoded.id;
    });

    let booking = await Booking.findOne({ uid: uid, status: "in-cart" }); //tìm bảng ghi giỏ hàng
    let booking_item = [];
    booking_item.push({ tour_id: req.params.tourid, type: req.params.type, quantity: req.params.quantity })

    if (booking == null) { //Nếu không có giỏ hàng sẵn, sẽ query tạo ra giỏ hàng mới
        await Booking({
            uid: uid,
            status: "in-cart",
            booking_items: booking_item,
            updated_at: Date.now(),
        }).save();
    } else { //nếu đã có giỏ hàng rồi, thì update lại 

        //!Kiểm tra xem tour có trong giỏ hàng không, bao gồm tourId và Loại vé
        let isExist = 0;
        for (let i = 0; i < booking.booking_items.length; i++) { //!Truy xuất đến từng item trong cart
            if (booking.booking_items[i].tour_id == req.params.tourid && booking.booking_items[i].type == req.params.type) {
                //!nếu item phù hợp với params thì update lại số lượng vé
                booking.booking_items[i].quantity += parseInt(req.params.quantity, 10);
                isExist = 1; //!Gắn cờ đã tồn tại
            }
        }
        if (isExist == 1)
            await booking.save();
        else await Booking.updateOne(
            { _id: booking._id },
            { $push: { booking_items: booking_item } } //!Nếu vé tour chưa có thì chúng ta push vé vào mảng booking items
        );

    }
    var total = 0;
    booking = await Booking.findOne({ uid: uid, status: "in-cart" });
    for (let i = 0; i < booking.booking_items.length; i++) { //!Truy xuất đến từng item trong cart
        let tour = await Tour.findById(booking.booking_items[i].tour_id);
        total += parseInt(booking.booking_items[i].quantity, 10) * (booking.booking_items[i].type == "adult" ? tour.adult_price : tour.child_price);
    }
    booking.total = total;
    booking.save();
    try {
        res.json(await Booking.findOne({ uid: uid, status: "in-cart" }));
    } catch (e) {
        res.json({ message: e });
    }
});

/* -------------------------- ADD NEW ITEM TO CART -------------------------- */
router.get("/edit-quantity-cart/:tourid/:type/:quantity", async (req, res) => {
    var token = req.headers["authorization"];

    if (!token)
        return res.status(401).send({ auth: false, message: "No token provided." });
    var uid;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        uid = decoded.id;
    });
    let booking = await Booking.findOne({ uid: uid, status: "in-cart" });
    for (let i = 0; i < booking.booking_items.length; i++) { //!Truy xuất đến từng item trong cart
        if (booking.booking_items[i].tour_id == req.params.tourid && booking.booking_items[i].type == req.params.type) {
            //!nếu item phù hợp với params thì update lại số lượng vé
            booking.booking_items[i].quantity = parseInt(req.params.quantity, 10);
            await booking.save();
            break;
        }
    }
    var total = 0;
    booking = await Booking.findOne({ uid: uid, status: "in-cart" });
    for (let i = 0; i < booking.booking_items.length; i++) { //!Truy xuất đến từng item trong cart
        let tour = await Tour.findById(booking.booking_items[i].tour_id);
        total += parseInt(booking.booking_items[i].quantity, 10) * (booking.booking_items[i].type == "adult" ? tour.adult_price : tour.child_price);
    }
    booking.total = total;
    booking.save();
    try {
        res.json(await Booking.findOne({ uid: uid, status: "in-cart" }));
    } catch (e) {
        res.json({ message: e });
    }
});
/* ----------------------------- GET tour by Id ----------------------------- */
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        res.json(booking);
    } catch (error) {
        res.json({ message: error });
    }
});
router.get("/complete/:id", async (req, res) => {
    try {

        await Booking.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: "complete"
                }
            }
        );
        const booking = await Booking.findById(req.params.id);
        res.json(booking);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {

        bookings = await Booking.find({ status: { '$regex': '^((?!in-cart).)*$', '$options': 'i' } })
        res.json(bookings);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
