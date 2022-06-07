require('dotenv').config();
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require("passport");
const passportConfig = require('./config/passport');
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const userRouter = require('./routes/userRouter');
const userInfoRouter = require('./routes/userInfoRouter');
const foodRouter = require("./routes/foodRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.set('port', 3000)

app.use(cors({ credentials: true, origin: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/userinfo', userInfoRouter);
app.use('/api/food', foodRouter);
app.use('/api/comment', commentRouter);

passportConfig();

app.listen(app.get("port"), () => {
  console.log("Express Server Listening on port : ", app.get('port'))
});

module.exports = app;