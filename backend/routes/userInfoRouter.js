const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')

router.get('/maskedUser', verifyToken, function(req, res) {
  try {
    const RegAge = '(?<=^.{0,2}).|(?<=^.{4,5}).';
    const RegPhone = '(?<=^.{3,6}).';
    const mask = '*';
      console.log('RegAge: ', RegAge);
      console.log('RegPhone: ', RegPhone);

      const connection = await pool.getConnection(async conn => conn);
      try {
        let sql = "SELECT REGEXP_REPLACE(user_age, ? , ?) " +
            "AS maskedAge, REGEXP_REPLACE(user_phone, ? , ?) " +
            "AS maskedPhone FROM web_order.users WHERE user_id = ?"
        let value = [RegAge, mask, RegPhone, mask, req.decoded.user_id]

        const [row] = await connection.query(sql, value);
        connection.release();
        res.send(row);
        console.log('row with mask', row);
      } catch (err) {
        connection.release();
        console.log("SQL error: ", err);
        res.send({
            error: "SQL error",
            err
        });
      }
  } catch(err) {
    console.log("DB error");
    res.send({
        error: "DB error",
        err
    });
  }
});

//  이거 왜 정보 받아오더라? 확인 필요
//  update, updateUser 이식할 차례일 듯
router.get('/mypage', verifyToken, function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            let sql = "SELECT user_acc, user_name, user_phone, user_age " +
                "FROM web_order.users WHERE user_id = ?"
            let value = [req.decoded.user_id]

            const [row] = await connection.query(sql, value);
            connection.release();
            res.send(row)
            console.log('res.send(row):', row);
        } catch (err) {
            connection.release();
            console.log("SQL error: ", err);
            res.send({
                error: "SQL error",
                err
            });
        }
    } catch(err) {
        console.log("DB error");
        res.send({
            error: "DB error",
            err
        })
    }
})

router.get('api/get/user/Order')