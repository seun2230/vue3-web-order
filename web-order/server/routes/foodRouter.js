const express = require('express');
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')


router.get('/get', async (req, res) => {
    try {
      console.log("DB Connection! /get")
      const connection = await pool.getConnection(async conn => conn);
      try {
        const [rows] = await connection.query('SELECT * FROM food_items')
        connection.release();
        res.send(rows)
      } catch(err) {
        console.log("Query Error")
        connection.release();
        res.send({
          error: "Query Error",
          err
        })
        return false;
      }
    } catch(err) {
      console.log("DB Error")
      res.send({
        error: "DB Error",
        err
      })
      return false;
    }
  })

  router.post('/order', verifyToken, async (req, res) => {
    try {
      console.log("DB Connection! /food/order")
      const connection = await pool.getConnection(async conn => conn);
      try {
        console.log("Query Start")
        const date = new Date()
        let sql = 'INSERT INTO order_num' +
        '(order_total_price, users_user_id, order_date)' +
        'VALUES(?, ?, ?)'
  
        let value = [req.body[1], req.decoded.user_id , date]
  
        await connection.beginTransaction();
        await connection.query(sql, value)
  
        for (let i = 0; i < req.body[0].length; i++) {
          let sql = 'INSERT INTO order_list' + 
            '(food_items_food_id, order_quantity, order_num_id_order_num)' +
            'VALUES(?, ?, ?)'
  
          const [rows] = await connection.query('SELECT max(id_order_num) FROM order_num')
  
            let value = [
              req.body[0][i].food_id,
              req.body[0][i].quantity,
              rows[0]["max(id_order_num)"]]
          await connection.query(sql, value)
        }
        await connection.commit();
        connection.release();
        res.send({
          result: "Success"
        })
      } catch(err) {
        console.log("Query Error")
        console.log("Error", err)
        await connection.rollback();
        connection.release();
        res.send({
          error: "Query Error",
          err
        })
      }
    } catch(err) {
      console.log("DB Error")
      res.send({
        error: "DB Error",
        err
      })
    }
  })

  module.exports = router;