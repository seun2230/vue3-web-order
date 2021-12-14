const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')
const { upload } = require('../api/S3UploadStorage')

router.post('/myorder', verifyToken, async(req, res) => {
    try {
      console.log("DB Connection! /myorder")
      const connection = await pool.getConnection(async conn => conn);
      try {
        console.log(req.body.num)

        if (req.body.num === undefined) {
          let sql = "SELECT * " +
            "FROM order_num LEFT JOIN order_list " +
            "ON id_order_num = order_num_id_order_num " +
            "LEFT JOIN food_items " +
            "ON food_items_food_id = food_id " +
            "LEFT JOIN users " +
            "ON users_user_id = user_id " +
            "WHERE user_id = ? "

          let value = [req.decoded.user_id]

          const [rows] = await connection.query(sql, value)

          connection.release();
          res.send(rows)
        } else {
          let sql = "SELECT * " +
            "FROM order_num LEFT JOIN order_list " +
            "ON id_order_num = order_num_id_order_num " +
            "LEFT JOIN food_items " +
            "ON food_items_food_id = food_id " +
            "LEFT JOIN users " +
            "ON users_user_id = user_id " +
            "WHERE user_id = ? AND order_status = ?"

          let value = [
            req.decoded.user_id,
            req.body.num]

          const [rows] = await connection.query(sql, value)

          connection.release();
          res.send(rows)

        }
      } catch(err) {
        connection.release();
        console.log("Query Error")
        console.log("Error", err)
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

router.post('/comments', upload.array('file'), verifyToken, async function(req, res) {
try {
  console.log("DB Connection! /comments")
  console.log(req.body)
  console.log(req.decoded)
  const connection = await pool.getConnection(async conn => conn);
 
  try {
    const files = req.files
    let image = []

    await connection.beginTransaction();

    for (let i = 0; i < req.files.length; i++) {
      image[i] = files[i].location
  }
  let sql = "INSERT INTO comments " +
    "(comments_image, comments_text, ratings, food_items_food_id, users_user_id, comments_title, comments_status)" +
    "VALUES(?, ?, ?, ?, ?, ?, ?)"

  
  let value = [
    image[0],
    req.body.review,
    req.body.ratings,
    req.body.menu,
    req.decoded.user_id,
    req.body.title,
    req.body.status
  ]

  console.log(value)
  await connection.query(sql, value);
  await connection.commit();
  connection.release();
  res.send({
      success: "true"
    })
  } catch(err) {
    console.log(err)
    res.send({
      success: "false",
      err
    })
    await connection.rollback();
    connection.release();
  }
} catch(err) {
  console.log(err)
  res.send({
    DB: "Unconnected",
    err
  })
}
})

router.get('/comments/get', async(req, res) => {
  try {
    console.log('DB 연결 성공!');
    const connection = await pool.getConnection(async conn => conn);

    try {
      const [row] = await connection.query('SELECT * FROM comments WHERE comments_status = 0')
      connection.release();
      res.send(row);
    } catch (err) {
      console.log("error 확인", err);
      connection.release();
    }
  } catch (err) {
    console.log("DB Error", err)
  }
})

module.exports = router;