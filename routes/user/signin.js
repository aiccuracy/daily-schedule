const express = require('express')
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    let signInHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/signin.html')
    res.sendFile(signInHtmlPath);
})

router.post("/", (req, res) => {
    // 로그인
})

module.exports = router;