const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    let userHomeHtmlPath = path.resolve(__dirname, '..', '..', 'html/user/userhome.html');
    res.status(200).sendFile(userHomeHtmlPath);
})

module.exports = router;