const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userhomeRouter = require('./routes/user/userhome');
const signinRouter = require("./routes/user/signin");
const signupRouter = require("./routes/user/signup");
const findRouter = require("./routes/user/find");
const userDeleteRouter = require("./routes/user/delete");
const pwupdateRouter = require("./routes/user/update");

const calendarRouter = require("./routes/calendar/calendarhome");
const appendRouter = require("./routes/calendar/append");
const calendarDeleteRouter = require("./routes/calendar/delete");
const calendarUpdateRouter = require("./routes/calendar/update");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

const MONGODB_URL = "mongodb://localhost:27017/calendar";
const PORT = 8080;

const db = mongoose
  .connect(MONGODB_URL, {
})
  .then( 
    console.log('Successfully connected to mongodb')
  )
  .catch((e) => console.error(e));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

app.get("/", (req, res)=> {
    res.redirect("/user");
})

app.use("/user", userhomeRouter);
app.use("/user/signin", signinRouter);
app.use("/user/signup", signupRouter);
app.use("/user/find", findRouter);
app.use("/user/delete", userDeleteRouter);
app.use("/user/update", pwupdateRouter);

app.use("/calendar", calendarRouter);
app.use("/calendar/append", appendRouter);
app.use("/calendar/delete", calendarDeleteRouter);
app.use("/calendar/update", calendarUpdateRouter);

app.use((err, req, res, next) => {
    res.json({ message: err.message});
})