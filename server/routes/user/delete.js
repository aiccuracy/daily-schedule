const express = require('express');
const router = express.Router();
const path = require('path');

const Users = require('../../models/userModel');

router.get("/", (req, res) => {
    let deleteHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/delete.html');
    res.sendFile(deleteHtmlPath);
})

// router.post("/", (req, res) => {
//     Users.deleteOne({ id: req.body.id, pw: req.body.pw }, (err, user) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         }
//         else {
//             if(user.id != undefined) {
//                 console.log("delete finish");
//                 res.send(`Delete '${req.body.id}' finish`);
//             } 
//             else {
//                 console.log("no user");
//                 res.send(`Delete: Invalide Id or PW`);
//             }
//         }
//     })
// })

router.delete("/", (req, res) => {
    Users.deleteOne({ email: req.body.email, id: req.body.id, pw: req.body.pw }, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            if(user.deletedCount != 0) {
                console.log("delete finish");
                res.send(`Delete '${req.body.id}' finish`);
            } 
            else {
                console.log("no user");
                res.send(`Delete: Invalide Id or PW`);
            }
        }
    })
})

module.exports = router;