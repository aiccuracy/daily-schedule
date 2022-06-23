const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const Users = require('../../models/userModel');

router.get("/", (req, res) => {
    let signupHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/signup.html');
    res.sendFile(signupHtmlPath);
})

router.post("/add", (req, res) => {
    assert(req.body.email.length !== 0, "email required");
    assert(req.body.id.length !== 0, "id required");
    assert(req.body.pw.length !== 0, "password required");

    // let errors = req.validationErrors();

    // if(errors) throw new Error("Invalid Input in SignUp");

    let userDetails = new Users({
        email: req.body.email,
        id: req.body.id,
        pw: req.body.pw
    }) 

    userDetails.save((err, data) => {
        if(err) {
            console.log(err);
        } else {
            console.log("saved");
        }
    })

    res.redirect("/user/signin");
})

module.exports = router;