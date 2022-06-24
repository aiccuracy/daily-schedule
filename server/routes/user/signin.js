const express = require('express')
const router = express.Router();
const path = require('path');
const url = require('url');

const Users = require('../../models/userModel.js');
const Sessions = require('../../models/sessionModel');

router.get("/", (req, res) => {
    Sessions.findOne({ userId: req.body.id }, (err, session) => {
        if(err) {
            console.log(err.message);
            res.status(400).send(err.message);
            return;
        }
        else {
            if(session) {
                console.log("Already Logined User");
                res.status(409).send("Already Logined User");
                return;
            }
            else {
                let signInHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/signin.html')
                res.status(200).sendFile(signInHtmlPath);
            }
        }
    })
})

router.post("/", (req, res) => {
    Users.findOne({ id: req.body.id, pw: req.body.pw }, (err, user) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
            return;
        }
        else {
            if(user) {
                req.session.userId = req.body.id;
                req.session.isLogined = true;
                
                console.log("Login Session Established");
                res.status(201).send("Login Session Established");
            }
            else res.status(400).send("Invalid User");
        }
    })

})

module.exports = router;