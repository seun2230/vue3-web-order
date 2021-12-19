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

router.post('/post/comment', upload.array('file'), verifyToken, async function(req, res) {
try {
  console.log("DB Connection! /post/comment")
  const connection = await pool.getConnection(async conn => conn);
  try {
    const files = req.files
    let image = []
    
    for (let i = 0; i < req.files.length; i++) {
      image[i] = files[i].location
    }
    console.log(image[0])
    let sql = "INSERT INTO comments " +
    "(comments_image, comments_text, ratings, food_items_food_id, comments_user_id, comments_title, comments_status)" +
    "VALUES(?, ?, ?, ?, ?, ?, ?)"
    if (image[0] === undefined) {
      const [row] = await connection.query("SELECT * FROM null_image");
      image[0] = [row][0][0].null_image

      let value = [
        image[0],
        req.body.review,
        req.body.ratings,
        req.body.menu,
        req.decoded.user_id,
        req.body.title,
        req.body.status
      ]
      await connection.query(sql, value);
      await connection.commit();
      connection.release();
      res.send({
          success: "true"
        })
    }
    let value = [
      image[0],
      req.body.review,
      req.body.ratings,
      req.body.menu,
      req.decoded.user_id,
      req.body.title,
      req.body.status
    ]

    console.log("value", value)
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

router.get('/get/comment', async(req, res) => {
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

router.get('/get/comment/:id', async(req, res) => {
  try {
    console.log('connection /get/orderList');
    const connection = await pool.getConnection(async conn => conn);
    var id = parseInt(req.params.id, 10)

    try {
      const [row] = await connection.query('SELECT * FROM comments LEFT JOIN food_items ON food_items_food_id = food_id WHERE comments_id = ?', id)
      connection.release();
      res.send(row);
    } catch (err) {
      console.log("Error", err);
      connection.release();
    }
  } catch (err) {
    console.log("DB Error", err)
  }
})

router.get('/delete/comment/:id', verifyToken, async(req,res) => {
  try {
    console.log("DB connection /post/commentDelete")
    const connection = await pool.getConnection(async conn => conn);
    var id = parseInt(req.params.id, 10)

    try {
      let sql = "DELETE FROM comments WHERE comments_id = ? AND comments_user_id = ?"
      let params = [ id, req.decoded.user_id ]
      await connection.beginTransaction();
      await connection.query(sql, params);
      await connection.commit();
      res.send({
        message: "Delete Success!"
      })
      connection.release();
      } catch(err) {
      console.log("Query Error");
      console.log("Err : ", err)
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
      error: "DB error",
      err
    })
  }
})

router.post('/update/comment/:id', upload.array('file'), verifyToken, async(req,res) => {
  try {
    console.log("DB connection /post/commentDelete")
    const connection = await pool.getConnection(async conn => conn);

    try {
      const files = req.files
      let image = []

      for (let i = 0; i < req.files.length; i++) {
        image[i] = files[i].location
      }
      let sql = "UPDATE comments " +
      "SET comments_image= ?, comments_text = ?, ratings = ?, comments_title = ? "+
      "WHERE comments_id = ? AND comments_user_id = ?"
      var id = parseInt(req.params.id, 10)
      let params = [
        image[0], 
        req.body.review,
        req.body.ratings,
        req.body.title,
        id,
        req.decoded.user_id,
      ]

      await connection.beginTransaction();
      await connection.query(sql, params);
      await connection.commit();
      res.send({
        message: "Delete Success!"
      })
      connection.release();
      } catch(err) {
      console.log("Query Error");
      console.log("Err : ", err)
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
      error: "DB error",
      err
    })
  }
})
router.get('/get/reply/:id', async(req, res) => {
  console.log("req.body", req.body);

  try {
    console.log("DB Connection /get/reply")
    const connection = await pool.getConnection(async conn => conn);
    
    try {
      let sql = "SELECT * FROM reply WHERE comments_comments_id = ? "
      let value = [ parseInt(req.params.id, 10) ]
      const [row] = await connection.query(sql, value);
      res.send(row)
      connection.release();
      } catch(err) {
      console.log("Query Error");
      console.log("Err : ", err)
      connection.release();
      res.send({
        error: "Query Error",
        err
      })
    }
  } catch(err) {
    console.log("DB Error")
    res.send({
      error: "DB error",
      err
    })
  }
})

router.post('/reply/:id', verifyToken, async(req,res) => {
  console.log("req.body", req.body);
  try {
    console.log("DB connection /post/commentDelete")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "INSERT INTO reply " +
                "(reply_text, comments_comments_id, users_user_id, food_items_food_id)"
                + "VALUES (?, ?, ?, ?)"

      const pageId = parseInt(req.params.id, 10)
      let params = [ 
        req.body[0].comment_text,
        pageId,
        req.decoded.user_id,
        req.body[0].food_id
      ]

      await connection.beginTransaction();
      await connection.query(sql, params);
      await connection.commit();
      res.send({
        message: "Delete Success!"
      })
      connection.release();
      } catch(err) {
      console.log("Query Error");
      console.log("Err : ", err)
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
      error: "DB error",
      err
    })
  }
})
module.exports = router;