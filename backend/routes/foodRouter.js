const express = require('express');
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')
const { format } = require ('../utils/DateUtils')

router.get('/get/foods', async (req, res) => {
  try {
    console.log("DB Connection! /get/foods")
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await connection.query('SELECT * FROM food_items');
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

router.get('/get/EachFood/:id', async (req, res) => {
  try {
    console.log("DB Connection! /get/Eachfood");
    const connection = await pool.getConnection(async conn => conn);
    let foodId = parseInt(req.params.id, 10);
    let value = [ foodId ];
    try {
      let sql ='SELECT * FROM food_items WHERE food_id = ?';
      const [rows] = await connection.query(sql, value);
      console.log("rows", rows);
      connection.release();
      res.send(rows);
    } catch(err) {
      console.log("getFood Query Error")
      connection.release();
      res.send({error: "getFood Query Error", err});
      return false;
    }
  } catch(err) {
    console.log("getFood DB Error")
    res.send({error: "getFood DB Error", err});
    return false;
  }
})

router.post('/post/foodOrder', verifyToken, async (req, res) => {
  try {
    console.log("DB Connection! /post/foodOrder")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("Query Start")
      const date = new Date().format('yyyy-MM-dd hh:mm:ss')
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