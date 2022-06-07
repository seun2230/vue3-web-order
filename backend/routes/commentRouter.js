const express = require('express')
const router = express.Router();
const pool = require('../db/index')
const { verifyToken } = require('../middleware/auth')
const { upload } = require('../api/S3UploadStorage')
const { format } = require('../utils/DateUtils')

router.get('/get/comment', async(req, res) => {
  try {
    console.log('DB connection /get/comment');
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [row] = await connection.query('SELECT * FROM comments WHERE comments_status = 0');
      connection.release();
      res.send(row);
    } catch (err) {
      console.log("error 확인", err);
      connection.release();
    }
  } catch (err) {
    console.log("DB Error", err);
  }
})

router.get('/get/comment/:id', async(req, res) => {
  try {
    console.log('connection /get/orderList');
    const connection = await pool.getConnection(async conn => conn);
    var id = parseInt(req.params.id, 10);

    try {
      let sql = 'SELECT * FROM comments LEFT JOIN food_items' 
                'ON food_items_food_id = food_id WHERE comments_id = ?';
      const [row] = await connection.query(sql, id);
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

router.get('/get/bestComment', async(req, res) => {
  try {
    console.log('DB Connection /get/bestComment');
    const connection = await pool.getConnection(async conn =>  conn);
    try {
      // 다시 작성 필요함.
      const [row] = await connection.query('select * from comments where ratings = (select max(ratings) from comments)');
      connection.release();
      res.send(row);
    } catch (err) {
      console.log("error check", err);
    }
  } catch (err) {
    console.log("DB error check", err);
  }
})

router.post('/post/comment/:id', upload.array('file'), verifyToken, async function(req, res) {
  console.log("req.body", req.body);
  console.log("req.body.keword", req.body.keyword);
  console.log("dd", req.body.keyword.length);
  console.log("status", req.body.status);

  const foodId = parseInt(req.params.id, 10);
  try {
    console.log("DB Connection! /post/comment");
    const connection = await pool.getConnection(async conn => conn);
    try {
      await connection.beginTransaction();
      const files = req.files;
      let image = [];
      const date = new Date().format('yyyy-MM-dd');

      for (let i = 0; i < req.files.length; i++) {
        image[i] = files[i].transforms[0].location;
        console.log("imageURL",image[i]);
      }
      let sql = "INSERT INTO comments " +
        "(comments_image, comments_image2, comments_image3, comments_text, ratings, food_items_food_id, comments_user_id, comments_title, comments_status, comments_date)" +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      if (image[0] === undefined) {
        const [row] = await connection.query("SELECT * FROM null_image");
        image[0] = row[0].null_image;
        image[1] = row[0].null_image;
        image[2] = row[0].null_image;

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
        ];

        await connection.query(sql, value);
        const [comments_id] = await connection.query("SELECT max(comments_id) FROM comments");
        if(typeof req.body.keyword === "string") {
          console.log(req.body.keyword);
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)";
            let keyValue = [ req.body.keyword, comments_id[0]["max(comments_id)"] ];
            console.log("keyValue", keyValue);
            await connection.query(sqlKeyword, keyValue);
            await connection.commit();
            connection.release();
        } else {
          for(let i = 0; i < req.body.keyword.length; i++) {
            console.log(req.body.keyword);
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)";
            let keyValue = [ req.body.keyword[i], comments_id[0]["max(comments_id)"] ];
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
        });
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
        ];
        await connection.query(sql, value);
        const [comments_id] = await connection.query("SELECT max(comments_id) FROM comments");
        if(typeof req.body.keyword === "string") {
          console.log(req.body.keyword);
            
          let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)"
          let keyValue = [ req.body.keyword, comments_id[0]["max(comments_id)"] ];
            
          console.log("keyValue", keyValue);
          
          await connection.query(sqlKeyword, keyValue);
          await connection.commit();
          connection.release();
        } else {
          for(let i = 0; i < req.body.keyword.length; i++) {
            console.log(req.body.keyword)
            
            let sqlKeyword = "INSERT INTO keyword (keyword, comments_comments_id) VALUES (?, ?)";
            let keyValue = [ req.body.keyword[i], comments_id[0]["max(comments_id)"] ];
            
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

router.post('/update/comment/:id', upload.array('file'), verifyToken, async(req,res) => {
  try {
    console.log("DB connection /post/commentDelete");
    const connection = await pool.getConnection(async conn => conn);

    try {
      const files = req.files;
      let image = [];

      for (let i = 0; i < req.files.length; i++) {
        image[i] = files[i].transforms[0].location;
      }
      let sql = "UPDATE comments " +
      "SET comments_image= ?, comments_text = ?, ratings = ?, comments_title = ? "+
      "WHERE comments_id = ? AND comments_user_id = ?";
      var id = parseInt(req.params.id, 10);
      let params = [
        image[0],
        req.body.review,
        req.body.ratings,
        req.body.title,
        id,
        req.decoded.user_id,
      ];

      await connection.beginTransaction();
      await connection.query(sql, params);
      await connection.commit();
      res.send({
        message: "Delete Success!"
      })
      connection.release();
      } catch(err) {
      console.log("Query Error");
      console.log("Err : ", err);
      await connection.rollback();
      connection.release();
      res.send({
        error: "Query Error",
        err
      })
    }
  } catch(err) {
    console.log("DB Error");
    res.send({
      error: "DB error",
      err
    })
  }
})

router.get('/delete/comment/:id', verifyToken, async(req,res) => {
  try {
    console.log("DB connection /post/commentDelete");
    const connection = await pool.getConnection(async conn => conn);
    var id = parseInt(req.params.id, 10);

    try {
      let sql = "DELETE FROM comments WHERE comments_id = ? AND comments_user_id = ?";
      let params = [ id, req.decoded.user_id ];
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
    console.log("DB Error");
    res.send({
      error: "DB error",
      err
    })
  }
})

module.exports = router;