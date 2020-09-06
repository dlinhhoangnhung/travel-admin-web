const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const Joi = require('@hapi/joi'); // import Joi
router.use(express.json())



/* ---------------------------------- SEED ---------------------------------- */
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.get('/seed', async (req, res) => {

    try {
        fs.createReadStream('routes/data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                
                results.forEach(element => {
                    const dom = new JSDOM(`<!DOCTYPE html> ${element.lichtrinh}`);
                    let desc = dom.window.document.body.getElementsByClassName('list__desc');
                    let num = dom.window.document.body.getElementsByClassName('num');
                    let activity = [];
                    for (let index = 0; index < desc.length; index++) {
                        activity.push({ num: num[index].textContent, desc: desc[index].textContent.replace('Xem thêm', '').replace('Ẩn đi', '') })
                        // console.log(num[index].textContent );

                    }
                    let tour = new Tour({
                        title: element.name,
                        image_url: "https://st.quantrimang.com/photos/image/2019/06/27/demo-la-gi-3.jpg",
                        descriptions: element.mota,
                        activities: activity,
                        vehicle: "BUS",
                        day: parseInt(element.ngay, 10),
                        night: parseInt(element.ngay, 10) - 1,
                        adult_price: parseFloat(element.gia, 10),
                        child_price: parseFloat(element.gia / 2, 10),
                        map_location: "non-located",
                        created_at: Date.now(),
                        updated_at: Date.now()
                    })
                   tour.save()
                   
                });
            });

            res.json("SEED IS LOADED");

    } catch (e) {
        res.json({ message: e });
    }
});
/* -------------------------------------------------------------------------- */



/* ------------------------------ GET LIST TOUR ----------------------------- */
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (e) {
        res.json({ message: e });
    }
});
/* ------------------------------ ADD NEW TOUR ------------------------------ */
router.post('/', async (req, res) => {
    const { error } = validateTour(req.body); // lay ket qua tu function validateTour
    if (error) //Neu ket qua ton tai loi, thi tra loi message 
        return res.status(404).send(error.details[0].message);//rs.error.details[0].message => thong bao loi

    const tour = new Tour({
        title: req.body.title,
        image_url: req.body.image_url,
        descriptions: req.body.descriptions,
        vehicle: req.body.vehicle,
        day: req.body.day,
        night: req.body.night,
        adult_price: req.body.adult_price,
        child_price: req.body.child_price,
        map_location: req.body.map_location,
        created_at: Date.now(),
        updated_at: Date.now()
    })
    try {
        const saveTour = await tour.save()
        res.json(saveTour);
    } catch (e) {
        res.json({ message: e })
    }
})



/* ----------------------------- GET tour by Id ----------------------------- */
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.json(tour);

    } catch (error) {
        res.json({ message: error });
    }
})
/* ------------------------------- SEARCH TOUR ------------------------------ */
router.get('/search/:name', async (req, res) => {
    try {
        const tour = await Tour.find({ title: new RegExp(req.params.name, "i") });
        res.json(tour);

    } catch (error) {
        res.json({ message: error });
    }
})
/* ------------------------------- UPDATE Tour ------------------------------ */
//! domain/api/tours/{id} param
router.put('/:id', async (req, res) => {
    try {
        const updateTour = await Tour.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } }
        );
        res.json(updateTour);
    } catch (error) {
        res.json({ message: error });
    }
})
/* ---------------------------- DELETE Tour by Id --------------------------- */
router.delete('/:id', async (req, res) => {
    try {
        removeTour = await Tour.remove({ _id: req.params.id });
        res.json(removeTour);
    } catch (error) {
        res.json({ message: error });
    }
})
/* -------------------- Function validate Tour using Joi -------------------- */
function validateTour(tour) {
    const schema = Joi.object( // tao 1 doi tuong Joi 
        {
            title: Joi.string().min(8).required(),
            image_url: Joi.string().min(3).required(),
            descriptions: Joi.string(),
            day: Joi.number().required(),
            night: Joi.number().required(),
            vehicle: Joi.string().required(),
            adult_price: Joi.number().required(),
            child_price: Joi.number().required(),
            map_location: Joi.string().required()
            // thuoc tinh can kiem tra co valid hay k?
        });
    return schema.validate(tour); // tra ve ket qua kiem tra
}
module.exports = router;