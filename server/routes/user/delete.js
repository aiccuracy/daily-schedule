const express = require('express');
const router = express.Router();
const path = require('path');

const Users = require('../../models/userModel');

router.get("/", (req, res) => {
    let deleteHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/delete.html');
    res.status(200).sendFile(deleteHtmlPath);
})

router.delete("/", (req, res) => {
    Users.deleteOne({ email: req.body.email, id: req.body.id, pw: req.body.pw }, (err, user) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            if(user.deletedCount != 0) {
                console.log("Delete Success");
                res.status(200).send("Delete Success");
            } 
            else {
                console.log("Invalide Id or PW");
                res.status(400).send("Invalide Id or PW");
            }
        }
    })
})

module.exports = router;