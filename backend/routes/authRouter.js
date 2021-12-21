const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const passport = require('passport')

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
  passport.authenticate('kakao', { 
    failureRedirect: '/', 
  }), (req, res) => { 
    res.redirect('/'); 
  });

router.post('/login', login);

router.post('/logout', (req, res) => {
  res.cookie('auth','',{ maxAge: 0 }).status(200).json({"message": "OK"})
})

router.post('/register', async(req, res) => {
  try {
    console.log("DB connection /auth/register")
    const connection = await pool.getConnection(async conn => conn);
    try {
      await connection.beginTransaction();
      console.log("log", req.body)
      const sign_info = {
        "user_id": req.body.user_id,
        "user_name": req.body.user_name,
        "user_password": req.body.user_password,
        "user_birthday": req.body.user_birthday,
        "user_phone": req.body.user_phone,
        "user_gender": req.body.user_gender
      }

      if(sign_info.user_id) {
        let sql = 'SELECT user_id FROM users ' +
          'WHERE user_id = ?'
        let value = [ sign_info.user_id ]
 
        const [row] = await connection.query(sql, value);

        if(row[0] === undefined) {
          const salt = await bcrypt.genSalt(10);
          const encryptedPassword = bcrypt.hashSync(sign_info.user_password, salt);

          let sql = 'INSERT INTO users'  +
            '(user_id, user_name, user_password, user_birthday, user_phone, user_gender)' +
            'VALUES(?, ?, ?, ?, ?, ?)';

          let value = [
            sign_info.user_id,
            sign_info.user_name,
            encryptedPassword,
            sign_info.user_birthday,
            sign_info.user_phone,
            sign_info.user_gender
          ]

          await connection.query(sql, value);
          await connection.commit();
          connection.release();
          res.send({
            "success": true
          })
        }
      }
    } catch(err) {
      console.log("err", err)
      res.send({
        "Error": err
      })
      await connection.rollback();
      connection.release();
    }
  } catch(err) {
    console.log("DB unconnected")
    res.send({
      "Error": err
    })
  }
})

module.exports = router;