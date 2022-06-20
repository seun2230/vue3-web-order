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

router.post('/write/reply/:id', verifyToken, async(req,res) => {
  try {
    console.log("DB connection /write/reply/:id")
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
        text: req.body[0].comment_text,
        userId: req.decoded.user_id,
        date
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