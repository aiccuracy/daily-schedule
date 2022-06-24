const express = require('express');
const router = express.Router();
const path = require('path');
const assert = require('assert');

const Users = require('../../models/userModel');

router.get("/id", (req, res) => {
    let findIdHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/findid.html');
    res.status(200).sendFile(findIdHtmlPath);
})

router.get("/pw", (req, res) => {
    let findPWHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/findpw.html');
    res.status(200).sendFile(findPWHtmlPath);
})

router.post("/id", (req, res) => {
    
    assert(req.body.email.length !== 0, "email required");
    
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            if(user) res.status(200).send(`your id is '${user.id}'`);
            else res.status(400).send(`your email is not invalid.`);
        }
    });
})

router.post("/pw", (req, res) => {
    assert(req.body.email.length !== 0, "email required");
    assert(req.body.id.length !== 0, "id required");

    Users.findOne({ email: req.body.email, id: req.body.id }, (err, user) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            if(user) res.status(200).send(`your pw is '${user.pw}'`);
            else res.status(400).send("your email or id in not invalid.");
        }
    });
})

module.exports = router;