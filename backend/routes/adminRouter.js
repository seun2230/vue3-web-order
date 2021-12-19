const express = require('express');
const router = express.Router();
const pool = require('../db/index')
const { upload } = require('../api/S3UploadStorage')

router.post('/post/foodUpload', upload.array('files'), async function(req, res) {
    try { 
      console.log("DB Connection! /post/foodUpload")
      const connection = await pool.getConnection(async conn => conn);
      try {
        const files = req.files
        let image = []  
  
        await connection.beginTransaction();
  
        for (let i = 0; i < req.files.length; i++) {
          image[i] = files[i].location
        }
  
          let sql = "INSERT INTO food_items" + 
            "(food_name, food_image1, food_image2, food_image3, food_info, food_price, food_category)" +
            "VALUES(?, ?, ?, ?, ?, ?, ?)"
  
          let value = [
            req.body.name,
            image[0],
            image[1],
            image[2],
            req.body.info,
            req.body.price,
            req.body.category
          ]
  
          await connection.query(sql, value)
          await connection.commit();
          connection.release();
          res.send({
            success: "true"
          })
        } catch(err) {
          console.log("Query Error")
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

    router.get('/get/slides', async(req, res) => {
      try {
        console.log("DB Connection! /get/slide")
        const connection = await pool.getConnection(async conn => conn);
        try {
          const [rows] = await connection.query('SELECT * FROM slide')
          connection.release();
          res.send(rows)
        } catch(err) {
          console.log("Query Error")
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

    router.post('/post/slideUpload', upload.array('files'), async function(req, res) {
      try { 
        console.log("DB Connection! /post/slideUpload")
        const connection = await pool.getConnection(async conn => conn);
        try {
          const files = req.files
          let image = []  
    
          await connection.beginTransaction();
    
          for (let i = 0; i < req.files.length; i++) {
            image[i] = files[i].location
          }
    
            let sql = "INSERT INTO slide" + 
              "(slide_image)" +
              "VALUES(?)"
    
            let value = [ image[0] ]
    
            await connection.query(sql, value)
            await connection.commit();
            connection.release();
            res.send({
              success: "true"
            })
          } catch(err) {
            console.log("Query Error")
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
  
    
router.post('/status', async(req, res) => {
  try {
    console.log("DB Connection! /order/status")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "UPDATE order_num SET order_status = 1 WHERE id_order_num = ?";
      let value = [req.body.id_order_num]

      await connection.beginTransaction();
      await connection.query(sql, value)

      await connection.commit();
      connection.release();
      res.send({
        status: "changed"
      })
    } catch(err) {
      console.log("query Error",err)
      res.send({
        status: "unchanged",
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

router.get("/orderlist", async (req, res) => {
  try {
    console.log("DB Connection! /orderlist")
    const connection = await pool.getConnection(async conn => conn);
    try {
    
      let sql = "SELECT * " +
      "FROM order_num LEFT JOIN order_list " +
      "ON id_order_num = order_num_id_order_num " +
      "LEFT JOIN food_items " +
      "ON food_items_food_id = food_id " +
      "LEFT JOIN users " +
      "ON users_user_id = user_id " +
      "WHERE order_status = 0";
      
      const [rows] = await connection.query(sql)
      connection.release();
      res.send(rows)
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
})

router.post('/post/foodDelete', async(req, res) => {
  try {
    console.log("DB connection /admin/delete")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("Query Start / admin / delete")
      let sql = "DELETE FROM food_items WHERE food_id = ?"
      let value = req.body.food_id
      
      await connection.beginTransaction();
      await connection.query("SET foreign_key_checks = 0");
      await connection.query(sql, value);
      await connection.query("SET foreign_key_checks = 1");
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

router.post('/post/foodModify', async(req, res) => {
  try {
    console.log("DB connection /post/foodModify")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let value = [req.body[0].name, req.body[0].price, req.body[0].category, req.body[0].desc, req.body[1]];
      let sql = "UPDATE food_items " +
        "SET food_name = ?, food_price = ?, food_category = ?, food_info =  ? "+
        "WHERE food_id = ?";
      
      await connection.beginTransaction();
      await connection.query(sql, value);
      await connection.commit();
      connection.release();
      res.send({
        message: "modify Success!"
      })
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

router.get("/get/comments", async (req, res) => {
  try {
    console.log("DB Connection! /get/comments")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "SELECT comments_text as text, comments_title as title," +
        "ratings, food_name, user_id as id, user_name as name," +
        "user_gender as gender, comments_image as image ,comments_id, food_category as category " +
        "FROM comments " +
        "LEFT JOIN food_items ON food_items_food_id = food_id " +
        "LEFT JOIN users ON users_user_id = user_id"
      const [rows] = await connection.query(sql)
      connection.release();
      res.send(rows)
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
})

router.get("/get/comments/:id", async (req, res) => {
  try {
    console.log("DB Connection! /get/comments")
    const connection = await pool.getConnection(async conn => conn);
    try {

      param
      let sql = "SELECT comments_text as text, comments_title as title," +
        "ratings, food_name, user_id as id, user_name as name," +
        "user_gender as gender, comments_image as image ,comments_id, food_category as category " +
        "FROM comments " +
        "LEFT JOIN food_items ON food_items_food_id = food_id " +
        "LEFT JOIN users ON users_user_id = user_id"
      const [rows] = await connection.query(sql)
      connection.release();
      res.send(rows)
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
})

router.post('/post/commentDelete', async(req, res) => {
  try {
    console.log("DB connection /post/commentDelete")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("Query Start / admin / delete / comments")
      let sql = "DELETE FROM comments WHERE comments_id = ?"
      let value = req.body.comments_id
      
      await connection.beginTransaction();
      await connection.query(sql, value);
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

router.get("/get/nullImage", async (req, res) => {
  try {
    console.log("DB Connection! /get/comments")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "SELECT * FROM null_image"
      const [rows] = await connection.query(sql)
      connection.release();
      res.send(rows)
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
})

router.post('/post/nullImageUpload', upload.array('files'), async function(req, res) {
  try { 
    console.log("DB Connection! /post/nullImageUpload")
    const connection = await pool.getConnection(async conn => conn);
    try {
      let sql = "SELECT * FROM null_image"
      const [rows] = await connection.query(sql)
      connection.release();
      res.send(rows)
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
})

module.exports = router;