const express = require('express');
const router = express.Router();
const path = require('path');

const Schedules = require('../../models/scheduleModel');

router.get("/", (req, res) => {
    let putHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/update.html')
    res.sendFile(putHtmlPath);
})

router.put("/", async (req, res) => {

    let scheduleNum = req.body.scheduleNum;
    let new_user = req.body.new_user;
    let new_task = req.body.new_task;
    let new_date = req.body.new_date;
    let new_private = req.body.new_private;
 
    const schedule = await Schedules.findOne({scheduleNum: scheduleNum});

    if (!schedule) {
        console.log("Invalid ScheduleNum");
        res.send("Invalid ScheduleNum");
    }
    else if (!new_user|| !new_task || !new_date || !new_private) {
        console.log("Invalid Input");
        res.send("Invalid Input");
    }
    else if (schedule.private && (new_user !== schedule.user)) {
        console.log("Permission Denied");
        res.send("Permission Denied");
    }
    else {
        await schedule.updateOne({ user: new_user, task: new_task, date: new_date, private: new_private });
        console.log("Update Success");
        res.send("Update Success");
    }
    

    // Schedules.findOne({ scheduleNum: scheduleNum }, (err, schedule) => {
    //     if (err) {
    //         console.log(err.message);
    //         res.send(err.message);
    //     }
    //     else if (!schedule) {
    //         console.log("Invalid ScheduleNum");
    //         res.send("Invalid ScheduleNum");
    //     }
    //     else if (!new_user|| !new_task || !new_date || !new_private) {
    //         console.log("Invalid Input");
    //         res.send("Invalid Input");
    //     }
    //     else if (schedule.private && (new_user !== schedule.user)) {
    //         console.log("Permission Denied");
    //         res.send("Permission Denied");
    //     }
    //     else {
    //         schedule.updateOne({}, { user: new_user, task: new_task, date: new_date, private: new_private });
    //         console.log("Update Success");
    //         res.send("Update Success");
    //     }
    // })

})

module.exports = router;