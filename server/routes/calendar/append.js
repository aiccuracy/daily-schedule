const express = require('express');
const router = express.Router();
const path = require('path');

const Schedules = require('../../models/scheduleModel');

router.get("/", (req, res) => {
    let calendarAddHtmlPath = path.resolve(__dirname, '..', '..', 'html/calendar/append.html');
    res.status(200).sendFile(calendarAddHtmlPath);
})

router.post("/", (req, res) => {

    let scheduleDetails = new Schedules({
        user: req.body.user,
        task: req.body.task,
        date: req.body.date,
        private: req.body.private === 'on'
    })

    scheduleDetails.save((err, data) => {
        if(err) {
            console.log(err.message);
            res.status(400).send(err.message);
        } else {
            console.log("new schedule added");
            res.status(201).send("Append Success");
        }
    })

})

module.exports = router;