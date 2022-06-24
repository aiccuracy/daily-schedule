const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const Users = require('../../models/userModel');

router.get("/", (req, res) => {
    let signupHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/signup.html');
    res.status(200).sendFile(signupHtmlPath);
})

router.post("/add", (req, res) => {
    assert(req.body.email.length !== 0, "email required");
    assert(req.body.id.length !== 0, "id required");
    assert(req.body.pw.length !== 0, "password required");

    let userDetails = new Users({
        email: req.body.email,
        id: req.body.id,
        pw: req.body.pw
    }) 

    userDetails.save((err, data) => {
        if(err) {
            console.log(err.message);
            res.status(400).send(err.message);
        } else {
            console.log("saved");
            res.status(201).send("New User Saved");
        }
    })
})

module.exports = router;