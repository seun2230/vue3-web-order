const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')
const { upload } = require('../api/S3UploadStorage.js')

router.get('/maskedUser', verifyToken, function(req, res) {
    const RegAge = '(?<=^.{0,2}).|(?<=^.{4,5}).';
    const RegPhone = '(?<=^.{3,6}).';
    const mask = '*';
    console.log('RegAge: ', RegAge);
    console.log('RegPhone: ', RegPhone);
    connection.query('SELECT REGEXP_REPLACE(user_age, ? , ?) AS maskedAge, REGEXP_REPLACE(user_phone, ? , ?) AS maskedPhone FROM web_order.users WHERE user_acc = ?',
    [RegAge, mask, RegPhone, mask, req.decoded.user_id], function(err, row) {
        if (err) {
            throw err;
        } else {
        // const maskedUser = row.toString().replace(row[0], )
        res.send(row);
        console.log('row on masked:', row);
        }
    })
})
