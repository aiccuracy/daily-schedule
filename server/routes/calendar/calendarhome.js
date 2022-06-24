const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const Schedules = require('../../models/scheduleModel');
const Sessions = require('../../models/sessionModel');

router.get("/", (req, res) => {
    if(!req.body.id || req.session.userId) {
        Schedules.find({private: true}, (err, schedules) => {
            if(err) {
                console.log(err.message);
                res.status(400).send(err.message);
                return;
            } else {
                console.log(schedules);
                res.status(200).send(schedules);
            }
        })
    }

    else {
        Sessions.findOne({ userId: req.body.id || req.session.userId }, (err, session) => {
            if(err) {
                console.log(err.message);
                res.status(400).send(err.message);
                return;
            }
            else {
                if(session) {
                    Schedules.find().or([{private: false}, {user: req.body.id || req.session.userId}], (err, schedules) => {
                        if(err) {
                            console.log(err.message);
                            res.status(400).send(err.message);
                        } else {
                            console.log(schedules);
                            res.status(200).send(schedules);
                        }
                    })
                }
                else {
                Schedules.find({private: true}, (err, schedules) => {
                    if(err) {
                        console.log(err.message);
                        res.status(400).send(err.message);
                        return;
                    } else {
                        console.log(schedules);
                        res.status(200).send(schedules);
                    }
                })
            }
        }
    })
}
})


module.exports = router;