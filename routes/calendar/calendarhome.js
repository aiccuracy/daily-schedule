const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const schedule = require('../../models/scheduleModel');

router.get("/", (req, res) => {
    let calendarHtmlPath = path.resolve(__dirname, '..', '..', 'html/calendar/calendarhome.html');
    res.sendFile(calendarHtmlPath);
})




module.exports = router;