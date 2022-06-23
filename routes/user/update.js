const express = require('express');
const router = express.Router();
const path = require('path');

const Users = require('../../models/userModel');

router.get("/", (req, res) => {
    let putHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/update.html')
    res.sendFile(putHtmlPath);
})

router.put("/", (req, res) => {
    let id = req.body.id;
    let current_pw = req.body.current_pw;
    let new_pw = req.body.new_pw;
    let pw_check = req.body.pw_check;
 
    if(new_pw !== pw_check) {
        console.log("pw different");
        res.send(`pw different with pw_check`);
    }
    else if (new_pw == current_pw) {
        console.log("same pw");
        res.send("Current Password Same as New Password");
    }
    else {
        Users.findOneAndUpdate({ id: id, pw: current_pw}, {pw: new_pw}, (err, user) => {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else if (user == null) {
                console.log("Invalid Input");
                res.send("Invalid Input"); 
            } 
            else {
                console.log("Update Finish");
                res.send("Update Finish");
            }
        
        });
    }
})

module.exports = router;