var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'web_order'
});

connection.connect((err) => {
  if (err) {
    console.error('mysql connection error!');
    console.error(err);
    throw err;
  }
});

router.get('/', function (req, res) {
  connection.query('SELECT * FROM web_order.users', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.post('/signup', function (req, res) {
  console.log('req.body on Back: ', req.body);
  const user = {
    'user_email': req.body.user_email,
    'user_name': req.body.user_name,
    'user_password': req.body.user_password
  };
  console.log('user to MySQL: ', user);
  connection.query('SELECT user_email FROM web_order.users WHERE user_email = ?',
  user.user_email,
    function (err, row) {
      if (row[0] === undefined) {
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.user_password, salt);
        connection.query
          ('INSERT INTO web_order.users (user_email, user_name, user_password) VALUES (?, ?, ?)',
          [user.user_email, user.user_name, encryptedPassword],
          function (err, row2) {
              if (err) throw err;
            });
            res.json({
              success: true,
              message: '회원 가입이 완료되었습니다!'
            })
      } else {
        res.json({
          success: false,
          message: '이미 등록된 이메일 주소입니다!'
        })
      }
    });
});

router.post('/login', function (req, res) {
  const user = {
    'user_email': req.body.user_email,
    'user_password': req.body.user_password
  };
  connection.query('SELECT user_email, user_password FROM web_order.users WHERE user_email = ?',
  [user.user_email],
  function (err, row) {
    if (err) {
      res.json({  //  아이디 없음
        success: false,
        message: '아이디 또는 이메일 주소를 확인해주세요!'
      })
    }
    if (row[0] !== undefined && row[0].user_email === user.user_email) {
      bcrypt.compare(user.user_password, row[0].user_password, function (err, res2) {
        if (res2) {
          res.json({
            success: true,
            message: '로그인 성공!'
          })
        } else {
          res.json({  //  비밀번호 다름
            success: false,
            message: '비밀번호를 확인해주세요!'
          })
        }
      })
    }
  })
});

module.exports = router;
