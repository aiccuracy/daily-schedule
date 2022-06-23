const express = require('express');
const router = express.Router();
const path = require('path');
const assert = require('assert');

const Users = require('../../models/userModel');

router.get("/id", (req, res) => {
    let findIdHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/findid.html');
    res.sendFile(findIdHtmlPath);
})

router.get("/pw", (req, res) => {
    let findPWHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/findpw.html');
    res.sendFile(findPWHtmlPath);
})

router.post("/id", (req, res) => {
    assert(req.body.email.length !== 0, "email required");
    
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (err) console.log(err);
        else {
            if(user) res.send(`your id is '${user.id}'`);
            else res.send(`your email is not invalid.`);
        }
    });
})

router.post("/pw", (req, res) => {
    assert(req.body.email.length !== 0, "email required");
    assert(req.body.id.length !== 0, "id required");

    Users.findOne({ email: req.body.email, id: req.body.id }, (err, user) => {
        if (err) console.log(err);
        else {
            if(user) res.send(`your pw is '${user.pw}'`);
            else res.send(`your email or id in not invalid.`);
        }
    });
})

module.exports = router;