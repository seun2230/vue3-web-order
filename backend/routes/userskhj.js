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

router.get('/maskedUser', verifyToken, function(req, res) {
  jwt.verify(req.token, process.env.JWT_KEY, err => {
    if (err) {
      console.log('Unauthrized');
      res.sendStatus(401);
    } else {
      const base64Payload = req.token.split('.')[1];
      const payload = Buffer.from(base64Payload, 'base64');
      const result = JSON.parse(payload.toString());
      console.log('resdfsdf:', result);

      const RegAge = '(?<=^.{0,2}).|(?<=^.{4,5}).';
      const RegPhone = '(?<=^.{3,6}).';
      const mask = '*';
      console.log('RegAge: ', RegAge);
      console.log('RegPhone: ', RegPhone);
      connection.query('SELECT REGEXP_REPLACE(user_age, ? , ?) AS maskedAge, REGEXP_REPLACE(user_phone, ? , ?) AS maskedPhone FROM web_order.users WHERE user_acc = ?',
      [RegAge, mask, RegPhone, mask, result.user], function(err, row) {
        if (err) {
          throw err;
        } else {
          // const maskedUser = row.toString().replace(row[0], )
          res.send(row);
          console.log('row on masked:', row);
        }
      })
    }
  })
})

router.get('/orderHistory', verifyToken, function (req, res) {
  jwt.verify(req.token, process.env.JWT_KEY, err => {
    if (err) {
      console.log('Unauthorized');
      res.sendStatus(401);
    } else {
        const base64Payload = req.token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        const result = JSON.parse(payload.toString());

        const query1 = 'SELECT user_id FROM web_order.users WHERE user_acc = ?';
        const query2 = 'SELECT * FROM web_order.orders WHERE user_id = ?';
        connection.query
        (query1, result.user, function (err, row) {
          if (err) {
            throw err
          } else {
            console.log('row~~:', row);
            connection.query
            (query2, row[0].user_id, function (err, row2) {
              console.log('row2~~~', row2);
              if (err) {
                throw err;
              } else {
                res.send(row2);
                console.log('orderHistory response:', row2);
              }
            })
          }
        })
      }
    })
})

router.get('/mypage', verifyToken, function (req, res) {
  console.log('update token:', req.token);
  jwt.verify(req.token, process.env.JWT_KEY, err => {
    if (err) {
      console.log('Unauthorized');
      res.sendStatus(401);
    } else {
        const base64Payload = req.token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        const result = JSON.parse(payload.toString());
        connection.query
        ('SELECT user_acc, user_name, user_phone, user_age FROM web_order.users WHERE user_acc = ?',
        result.user, function (err, row) {
          console.log('result.user:', result.user);
          if (err) throw err;
          res.send(row);
          console.log('res.send(row)', row);
        })
      }
  })
})

router.post('/update', function(req, res, next) {
  console.log('update user data', req.body);
  const user = {
    'user_acc': req.body.user_acc,
    'user_name': req.body.user_name,
    'user_password': req.body.user_password,
    'user_phone': req.body.user_phone,
    'user_age': req.body.user_age,
  };
  const salt = bcrypt.genSaltSync();
  const encryptedPassword = bcrypt.hashSync(user.user_password, salt);
  connection.query
    ('UPDATE web_order.users SET user_name = ? , user_password = ? , user_phone = ? , user_age = ? WHERE user_acc = ?',
    [user.user_name, encryptedPassword, user.user_phone, user.user_age, user.user_acc],
    function (err, row) {
      if (err) {
        throw err;
      } else {
        connection.query('SELECT user_name FROM web_order.users WHERE user_acc = ?',
        user.user_acc, function(err, row) {
          if (err) {
            throw err;
          } else {
            res.send(row);
            console.log('row on update!:', row);
          // res.sendStatus(200);
        }
      });
    };
  })
});

router.post('/signup', function (req, res) {
  console.log('req.body on Back: ', req.body);
  const user = {
    'user_acc': req.body.user_acc,
    'user_name': req.body.user_name,
    'user_password': req.body.user_password,
    'user_phone': req.body.user_phone,
    'user_age': req.body.user_age,
  };
  if (user.user_acc)
  console.log('user to MySQL: ', user);
  connection.query('SELECT user_acc FROM web_order.users WHERE user_acc = ?',
  user.user_acc,
    function (err, row) {
      if (row[0] === undefined) {
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.user_password, salt);
        connection.query
          ('INSERT INTO web_order.users (user_acc, user_name, user_password, user_phone, user_age) VALUES (?, ?, ?, ?, ?)',
          [user.user_acc, user.user_name, encryptedPassword, user.user_phone, user.user_age],
          function (err, row2) {
              if (err) throw err;
            });
            const token = jwt.sign({ user: user.user_acc }, process.env.JWT_KEY);
            res.json({
              token,
              success: true,
              // message: '회원 가입이 완료되었습니다!'
            })
      } else {
        res.json({
          success: false,
          // message: '이미 등록된 아아디 입니다!'
        })
      }
    });
});

router.post('/login', function (req, res) {
  const user = {
    'user_acc': req.body.user_acc,
    'user_password': req.body.user_password
  };
  connection.query('SELECT user_acc, user_name, user_password FROM web_order.users WHERE user_acc = ?',
  [user.user_acc],
  function (err, row) {
    if (err) {
      res.json({  //  아이디 없음
        success: false,
        // message: '아이디를 확인해주세요!'
      })
    }
    if (row[0] !== undefined && row[0].user_acc === user.user_acc) {
      bcrypt.compare(user.user_password, row[0].user_password, function (err, res2) {
        if (res2) {
          const token = jwt.sign({ user: user.user_acc }, `${process.env.JWT_KEY}`);
          const user_name = row[0].user_name;
          res.json({
            token,
            user_name,
            success: true,
            // message: '로그인 성공!'
          })
        } else {
          res.json({  //  비밀번호 다름
            success: false,
            // message: '비밀번호를 확인해주세요!'
          })
        }
      })
    }
  })
});

module.exports = router;
