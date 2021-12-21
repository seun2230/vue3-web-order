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
const userRouter = require('./routes/userRouter');
const userInfoRouter = require('./routes/userInfoRouter');

const mqtt = require('mqtt');


// Client 생성 
const client = mqtt.connect('mqtt://test.mosquitto.org');

let topic = 'topic1'
let message = '(1)상품 준비중 입니다.'

client.on('connect', function () {
  console.log('connected!');

  client.subscribe('topic1', function (err) {
    if (!err) {
      // Message 전송
      client.publish(topic, message)
      console.log(topic, message)
    }
  })
})

// Message 수신부
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(`topic: ${topic.toString()}, message: ${message.toString()}`)    // result: <Buffer 48 65 6c 6c 6f 57 6f 72 6c 64>
  console.log(message.toString()) // result: Hello mqtt
  client.end()
})


const app = express();

app.set('port', 3000)

app.use(cors({ credentials: true, origin: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/food', foodRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/userinfo', userInfoRouter);
passportConfig();

app.listen(app.get("port"), () => {
  console.log("Express Server Listening on port : ", app.get('port'))
});

module.exports = app;