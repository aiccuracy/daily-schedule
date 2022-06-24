const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const Schedules = require('../../models/scheduleModel');
const Sessions = require('../../models/sessionModel');

router.get("/", (req, res) => {
    console.log(req.session);
    let id = req.body.id || req.session.userId;

    if(id) {
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
        Sessions.findOne({ userId: id }, (err, session) => {
            if(err) {
                console.log(err.message);
                res.status(400).send(err.message);
                return;
            }
            else {
                if(session) {
                    console.log("session");
                    console.log(id);
                    Schedules.find({$or: [{private: false}, {user: id}]}, (err, schedules) => {
                        if(err) {
                            console.log(err.message);
                            res.status(400).send(err.message);
                        } else {
                            // console.log(schedules);
                            res.status(200).send(schedules);
                        }
                    })
                }
                else {
                    console.log("no session");
                    Schedules.find({private: false}, (err, schedules) => {
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