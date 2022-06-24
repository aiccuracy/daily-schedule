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
 
    if(!new_user || !req.session.userId) {
        console.log("login Required");
        res.status(401).send("Login Required");
        return;
    }

    const schedule = await Schedules.findOne({scheduleNum: scheduleNum});

    if (!schedule) {
        console.log("Invalid ScheduleNum");
        res.status(400).send("Invalid ScheduleNum");
    }
    else if (!new_user|| !new_task || !new_date || !new_private) {
        console.log("Invalid Input");
        res.status(400).send("Invalid Input");
    }
    else if (schedule.private && (new_user !== schedule.user)) {
        console.log("Permission Denied");
        res.status(403).send("Permission Denied");
    }
    else {
        await schedule.updateOne({ user: new_user, task: new_task, date: new_date, private: new_private });
        console.log("Update Success");
        res.status(200).send("Update Success");
    }

})

module.exports = router;