const express = require('express');
const router = express.Router();
const path = require('path');

const Schedules = require('../../models/scheduleModel');

router.delete("/", (req, res) => {
    let scheduleNum = req.body.scheduleNum;
    let user = req.body.user || req.session.userId;

    if(!user) {
        console.log("login Required");
        res.status(401).send("Login Required");
        return;
    }

    Schedules.findOne({ scheduleNum: scheduleNum }, (err, schedule) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            if(!user) {
                console.log("Permission Denied");
                res.status(403).send("Permission Denied");
            }
            else if(schedule) {
                if ((!schedule.private) || (schedule.private && (user === schedule.user))) {
                    schedule.delete();
                    console.log("Delete Success");
                    res.status(200).send("Delete Success");
                }   
                else {
                    console.log("Permission Denied");
                    res.status(403).send("Permission Denied");
                }
            }
            else res.status(400).send("Invalid Schedule Num");
        }
    });
})

module.exports = router;