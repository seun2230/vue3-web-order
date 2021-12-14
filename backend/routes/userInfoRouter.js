const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')

router.get('/maskedUser', verifyToken, async(req, res) => {
    try {
        const RegAge = '(?<=^.{0,2}).|(?<=^.{4,5}).';
        const RegPhone = '(?<=^.{3,6}).';
        const mask = '*';
        console.log('RegAge: ', RegAge);
        console.log('RegPhone: ', RegPhone);

        const connection = await pool.getConnection(async conn => conn);
        try {
            let sql = "SELECT REGEXP_REPLACE(user_birthday, ? , ?) " +
                "AS maskedAge, REGEXP_REPLACE(user_phone, ? , ?) " +
                "AS maskedPhone FROM users WHERE user_id = ?"
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

router.post('/updateUserInfo', async(req, res) => {
    console.log('update user data', req.body);
    const update_info = {
        "user_id": req.body.user_id,
        "user_name": req.body.user_name,
        "user_password": req.body.user_password,
        "user_birthday": req.body.user_birthday,
        "user_phone": req.body.user_phone,
        "user_gender": req.body.user_gender
      }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = bcrypt.hashSync(update_info.user_password, salt);

    let sql = "UPDATE web_order.users SET user_name = ? , " +
        "user_password = ? , user_phone = ? , user_age = ? " +
        "WHERE user_acc = ?"

    let value = [
        update_info.user_name,
        encryptedPassword,
        update_info.user_phone,
        update_info.user_birthday,
        update_info.user_id
    ]

    await connenction.query(sql, value);
    await connection.commit();
    connection.release();
    res.sendStatus(200)

    connection.query
      ('UPDATE web_order.users SET user_name = ? , user_password = ? , user_phone = ? , user_age = ? WHERE user_acc = ?',
      [update_info.user_name, encryptedPassword, update_info.user_phone, update_info.user_birthday, update_info.user_id],
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

//  수정 폼 기 정보
// router.get('/mypage', verifyToken, async(req, res) => {
//     try {
//         const connection = await pool.getConnection(async conn => conn);
//         try {
//             let sql = "SELECT user_acc, user_name, user_phone, user_age " +
//                 "FROM web_order.users WHERE user_id = ?"
//             let value = [req.decoded.user_id]

//             const [row] = await connection.query(sql, value);
//             connection.release();
//             res.send(row)
//             console.log('res.send(row):', row);
//         } catch (err) {
//             connection.release();
//             console.log("SQL error: ", err);
//             res.send({
//                 error: "SQL error",
//                 err
//             });
//         }
//     } catch(err) {
//         console.log("DB error");
//         res.send({
//             error: "DB error",
//             err
//         })
//     }
// })

module.exports = router;
