const express = require('express');
const router = express.Router();
const path = require('path');

const Schedules = require('../../models/scheduleModel');

router.delete("/", (req, res) => {
    let scheduleNum = req.body.scheduleNum;
    let user = req.body.user;


    Schedules.findOne({ scheduleNum: scheduleNum }, (err, schedule) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);
        }
        else {
            if(!user) {
                console.log("Invalid User");
                res.send("Invalid User");
            }
            else if(schedule) {
                if ((!schedule.private) || (schedule.private && (user === schedule.user))) {
                    schedule.delete();
                    console.log("Delete Success");
                    res.send("Delete Success");
                }   
                else {
                    console.log("Permission Denied");
                    res.send("Permission Denied");
                }
            }
            else res.send("Invalid Schedule Num");
        }
    });
})

module.exports = router;