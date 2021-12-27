const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')
const { upload } = require('../api/S3UploadStorage')
const { format } = require('../utils/DateUtils')

router.get('/get/orderList', verifyToken, async(req, res) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "SELECT id_order_list as id ,id_order_num, order_quantity as quantity, order_date, order_status as status, order_total_price as price, food_name, food_id " +
        "FROM order_list " +
        "LEFT JOIN order_num ON order_num_id_order_num = id_order_num " +
        "LEFT JOIN food_items ON food_items_food_id = food_id " +
        "WHERE users_user_id = ?";
      let value = [req.decoded.user_id];
      const [rows] = await connection.query(sql, value);
      connection.release();
      res.send(rows)
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

router.post('/post/comment/:id', upload.array('file'), verifyToken, async function(req, res) {
  console.log("req.body", req.body);
  console.log("req.body.keword", req.body.keyword)
  console.log("dd", req.body.keyword.length)
  console.log("status", req.body.status);

  const foodId = parseInt(req.params.id, 10);
  try {
    console.log("DB Connection! /post/comment")
    const connection = await pool.getConnection(async conn => conn);
    try {
      await connection.beginTransaction();
      const files = req.files
      let image = []
      const date = new Date().format('yyyy-MM-dd')

      for (let i = 0; i < req.files.length; i++) {
        image[i] = files[i].transforms[0].location
        console.log("imageURL",image[i])
      }
      let sql = "INSERT INTO comments " +
        "(comments_image, comments_image2, comments_image3, comments_text, ratings, food_items_food_id, comments_user_id, comments_title, comments_status, comments_date)" +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      if (image[0] === undefined) {
        const [row] = await connection.query("SELECT * FROM null_image");
        image[0] = row[0].null_image
        image[1] = row[0].null_image
        image[2] = row[0].null_image
        let value = [
          image[0],
          image[1],
          image[2],
          req.body.review,
          req.body.ratings,
          foodId,
          req.decoded.user_id,
          req.body.title,
          req.body.status,
          date,
        ]
        await connection.query(sql, value);
        const [comments_id] = await connection.query("SELECT max(comments_id) FROM comments");
        if(typeof req.body.keyword === "string") {
          console.log(req.body.keyword)
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)"
            let keyValue = [ req.body.keyword, comments_id[0]["max(comments_id)"] ]
            console.log("keyValue", keyValue);
            await connection.query(sqlKeyword, keyValue);
            await connection.commit();
            connection.release();
        } else {
          for(let i = 0; i < req.body.keyword.length; i++) {
            console.log(req.body.keyword)
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)"
            let keyValue = [ req.body.keyword[i], comments_id[0]["max(comments_id)"] ]
            console.log("keyValue", keyValue);
            await connection.query(sqlKeyword, keyValue);
            await connection.commit();
            connection.release();
          }
        }
        await connection.commit();
        connection.release();
        res.send({
          success: "true"
        })
      } else {
        let value = [
          image[0],
          image[1],
          image[2],
          req.body.review,
          req.body.ratings,
          foodId,
          req.decoded.user_id,
          req.body.title,
          req.body.status,
          date,
        ]
        await connection.query(sql, value);
        const [comments_id] = await connection.query("SELECT max(comments_id) FROM comments");
        if(typeof req.body.keyword === "string") {
          console.log(req.body.keyword)
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)"
            let keyValue = [ req.body.keyword, comments_id[0]["max(comments_id)"] ]
            console.log("keyValue", keyValue);
            await connection.query(sqlKeyword, keyValue);
            await connection.commit();
            connection.release();
        } else {
          for(let i = 0; i < req.body.keyword.length; i++) {
            console.log(req.body.keyword)
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)"
            let keyValue = [ req.body.keyword[i], comments_id[0]["max(comments_id)"] ]
            console.log("keyValue", keyValue);
            await connection.query(sqlKeyword, keyValue);
            await connection.commit();
            connection.release();
          }
        }
        await connection.commit();
        connection.release();
        res.send({
          success: "true"
        })
      }
    } catch(err) {
      await connection.rollback();
      connection.release();
      console.log("Error", err)
      res.send({
        success: "false",
        message: err
      })
    }
  } catch(err) {
    console.log("DB Error /post/comment". err);
    res.send({
      success: "false",
      message: err
    })
  }
})

router.get('/get/keyword/:id', async(req, res) => {
  try {
    console.log('DB connection /get/keyword');
    const connection = await pool.getConnection(async conn => conn);
    let id = (parseInt(req.params.id,10))
    try {
      console.log(id)
      const [row] = await connection.query('SELECT * FROM keyword WHERE comments_comments_id = ?', id)
      connection.release();
      res.send(row);

    } catch (err) {
      console.log("DB error test", err);
      connection.release();
    }
  } catch (err) {
    console.log("DB error", err)
  }
})

router.get('/get/comment', async(req, res) => {
  try {
    console.log('DB connection /get/comment');
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
        image[i] = files[i].transforms[0].location
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
  try {
    console.log("DB connection /reply/:id")
    const connection = await pool.getConnection(async conn => conn);
    try {
      const date = new Date().format('yyyy-MM-dd hh:mm')
      const pageId = parseInt(req.params.id, 10);
      let sql = "INSERT INTO reply " +
        "(reply_text, comments_comments_id, users_user_id, food_items_food_id, reply_date)" +
        "VALUES (?, ?, ?, ?, ?)"
      let value = [
        req.body[0].comment_text,
        pageId,
        req.decoded.user_id,
        req.body[0].food_id,
        date
      ]
      await connection.beginTransaction();
      await connection.query(sql, value);
      await connection.commit();
      res.send({
        message: "success"
      })
      connection.release();
    } catch(err) {
      await connection.rollback();
      connection.release();
      console.log("Error", err)
      res.send({
        message: "Query Error",
        err: err
      })
    }
  } catch(err) {
    console.log("DB Error")
    res.send({
      message: "DB error",
      err: err
    })
  }
})

router.post('/modify/reply/:id', verifyToken, async(req,res) => {

  try {
    console.log("DB connection /post/modify/reply")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("sss", req.body)
      let id = parseInt(req.params.id, 10);
      let sql = "UPDATE reply " +
                "SET reply_text = ? " +
                "WHERE comments_comments_id = ? AND id_reply = ? AND users_user_id = ?"
      let params = [
        req.body.comment_text,
        id,
        req.body.reply_id,
        req.decoded.user_id,
      ]
      console.log("ss", params)

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
"DELETE FROM comments WHERE comments_id = ? AND comments_user_id = ?"

router.post('/delete/reply/:id', verifyToken, async(req,res) => {

  try {
    console.log("DB connection /post/commentDelete")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let id = parseInt(req.params.id, 10);
      let sql = "DELETE FROM reply" +
      " WHERE comments_comments_id = ? AND id_reply = ? AND users_user_id = ?"
      console.log(req.body)
      let params = [
        id,
        req.body.reply_id,
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

router.get('/get/likeStatus/:id', async(req, res) => {
  try {
    console.log("DB connection /get/likeStatus")
    const connection = await pool.getConnection(async conn => conn);
    try {
      const pageId = parseInt(req.params.id, 10);
      let sql = "SELECT users_user_id as user_id FROM user_like " +
                "WHERE comments_comments_id = ?";
      let value = [
        pageId,
      ]
      await connection.beginTransaction();
      const [row] = await connection.query(sql, value);
      await connection.commit();
      res.send(row);
      connection.release();
    } catch(err) {
      await connection.rollback();
      connection.release();
      console.log("Error", err)
      res.send({
        message: "Query Error",
        err: err
      })
    }
  } catch(err) {
    console.log("DB Error")
    res.send({
      message: "DB error",
      err: err
    })
  }
})

router.post('/post/likeUp/:id', verifyToken, async(req, res) => {
  try {
    console.log("DB connection /post/likeUp")
    const connection = await pool.getConnection(async conn => conn);
    try {
      const pageId = parseInt(req.params.id, 10);
      let sql = "INSERT INTO user_like " +
        "(comments_comments_id, users_user_id)" +
        "VALUES (?, ?)";
      let value = [
        pageId,
        req.decoded.user_id,
      ]
      await connection.beginTransaction();
      await connection.query(sql, value);
      await connection.commit();
      res.send({
        message: "success"
      })
      connection.release();
    } catch(err) {
      await connection.rollback();
      connection.release();
      console.log("Error", err)
      res.send({
        message: "Query Error",
        err: err
      })
    }
  } catch(err) {
    console.log("DB Error")
    res.send({
      message: "DB error",
      err: err
    })
  }
})

router.post('/post/likeDown/:id', verifyToken, async(req, res) => {
  try {
    console.log("DB connection /post/likeDown")
    const connection = await pool.getConnection(async conn => conn);
    try {
      const pageId = parseInt(req.params.id, 10);
      let sql = "DELETE FROM user_like WHERE users_user_id = ? AND comments_comments_id = ?";
      let value = [
        req.decoded.user_id,
        pageId,
      ]
      await connection.beginTransaction();
      await connection.query(sql, value);
      await connection.commit();
      res.send({
        message: "success"
      })
      connection.release();
    } catch(err) {
      await connection.rollback();
      connection.release();
      console.log("Error", err)
      res.send({
        message: "Query Error",
        err: err
      })
    }
  } catch(err) {
    console.log("DB Error")
    res.send({
      message: "DB error",
      err: err
    })
  }
})

router.get('/get/myarticle', verifyToken, async(req, res) => {
  try {
    console.log("DB connection /get/myarticle");
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "SELECT * " +
        "FROM user_like " +
        "LEFT JOIN comments ON comments_id = comments_comments_id " +
        "WHERE comments_status = 0 AND users_user_id = ?" ;
      let value = [
        req.decoded.user_id,
      ]
      const [row] = await connection.query(sql, value);
      connection.release();
      console.log(row[0])
      res.send(row);
    } catch (err) {
      console.log("SQL Error:", err);
      connection.release();
    }
  } catch (err) {
    console.log("DB Error:", err);
  }
})

module.exports = router;