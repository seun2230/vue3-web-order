require('dotenv').config();
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require("passport");
const passportConfig = require('./config/passport');
const authRouter = require("./routes/authRouter");
const foodRouter = require("./routes/foodRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

// module.exports  = const { verifyToken } = require('./middleware/auth');

// export const pool = require("./db/index")

// export const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, path.join('./', '/uploads'))
//   },
//   filename(req, file, callback) {
//     let array = file.originalname.split('.')
//     array[0] = array[0] + "_";
//     array[1] = "." + array[1];
//     array.splice(1, 0, Date.now().toString());

//     const result = array.join('');
//     callback(null, result)
//   }
// })

// export const upload = multer({
//   storage,
//   limits: {
//     files: 10,
//     fileSize: 10 * 1024 * 1024
//   }
// })

app.set('port', 3000)

app.use(cors({ credentials: true, origin: true }))
app.use(express.static('uploads'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/food', foodRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
passportConfig();

app.listen(app.get("port"), () => {
  console.log("Express Server Listening on port : ", app.get('port'))
});

module.exports = app;