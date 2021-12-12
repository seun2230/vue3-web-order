const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const multer = require("multer")
const { verifyToken } = require('../middleware/auth')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join('./', '/uploads'))
    },
    filename(req, file, callback) {
        let array = file.originalname.split('.')
        array[0] = array[0] + "_"
        array[1] = "." + array[1]
        array.splice(1, 0, Date.now().toString())
        
        const result = array.join('')
        callback(null, result)
    }
})

const upload = multer({
  storage,
    limits: {
      files: 10,
      fileSize: 10 * 1024 * 1024
    }
  })


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

router.post('/comments', upload.array('files'), async function(req, res) {
try {
  console.log("DB Connection! /comments")
  const connection = await pool.getConnection(async conn => conn);
  try {
    const files = req.files
    let image = []

    await connection.beginTransaction();

    for (let i = 0; i < req.files.length; i++) {
        image[i] = 'http://localhost:3000/' + files[i].filename
  }
  let sql = "INSERT INTO comments " +
    "(comments_image, comments_text, ratings, food_items_food_id, users_user_id)" +
    "VALUES(?, ?, ?, ?, ?)"

  let value = [
      image[0],
      req.body.text,
      req.body.ratings,
      req.body.food_id,
      req.body.user_id
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

module.exports = router;