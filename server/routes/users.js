var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

//  verifying Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log('Bearer Token!:', req.headers);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1].trim();
    req.token = bearerToken;
    console.log('req.token on verified:', req.token);
    next();
  } else {
    console.log('req.headers on verifying:', req.headers);
    console.log('req.token on verifying:', req.token);
    console.log('Unauthorized on verifying token');
    res.sendStatus(401);
  }
}

router.get('/', function (req, res) {
  connection.query('SELECT * FROM web_order.users', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/mypage', verifyToken, function (req, res) {
  console.log('update token:', req.token);
  jwt.verify(req.token, 'the_secret_key', err => {
    if (err) {
      console.log('Unauthorized');
      res.sendStatus(401);
    } else {
        const base64Payload = req.token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        const result = JSON.parse(payload.toString());
        connection.query
        ('SELECT * FROM web_order.users WHERE user_email = ?',
        result.user, function (err, row) {
          console.log('result.user:', result.user);
          if (err) throw err;
          res.send(row);
        })
      }
  })
})

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
            const token = jwt.sign({ user: user.user_email }, 'the_secret_key');
            res.json({
              token,
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
          const token = jwt.sign({ user: user.user_email }, 'the_secret_key');
          res.json({
            token,
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

router.post('/update', function(req, res, next) {
  console.log('update user data', req.body);
  const user = {
    'user_email': req.body.user_email,
    'user_name': req.body.user_name,
    'user_password': req.body.user_password
  };
  const salt = bcrypt.genSaltSync();
  const encryptedPassword = bcrypt.hashSync(user.user_password, salt);
  connection.query
    ('UPDATE web_order.users SET user_name = ? , user_password = ? WHERE user_email = ?',
    [user.user_name, encryptedPassword, user.user_email],
    function (err, row) {
      if (err) {
        throw err;
      }
    });
});

module.exports = router;
