const express = require('express');
const router = express.Router();
const pool = require('../db/index')
// const multer = require("multer")
const { Upload } = require('../api/S3UploadStorage')
// const path = require('path')


// const storage = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, path.join('./', '/uploads'))
//     },
//     filename(req, file, callback) {
//         let array = file.originalname.split('.')
//         array[0] = array[0] + "_"
//         array[1] = "." + array[1]
//         array.splice(1, 0, Date.now().toString())
        
//         const result = array.join('')
//         callback(null, result)
//     }
// })

// const upload = multer({
//   storage,
//     limits: {
//       files: 10,
//       fileSize: 10 * 1024 * 1024
//     }
//   })

router.post('/uploads', Upload.array('files'), async function(req, res) {
    try { 
      console.log("DB Connection! /uploads")
      // const connection = await pool.getConnection(async conn => conn);
      try {
        console.log(req.file.location)
        const files = req.files
        let image = []
  
        // await connection.beginTransaction();
  
        for (let i = 0; i < req.files.length; i++) {
          image[i] = 'http://localhost:3000/' + files[i].filename
        }
  
          // let sql = "INSERT INTO food_items" + 
          //   "(food_name, food_image1, food_image2, food_image3, food_info, food_price, food_category)" +
          //   "VALUES(?, ?, ?, ?, ?, ?, ?)"
  
          // let value = [
          //   req.body.name,
          //   image[0],
          //   image[1],
          //   image[2],
          //   req.body.info,
          //   req.body.price,
          //   req.body.category
          // ]
  
          // await connection.query(sql, value)
          // await connection.commit();
          // connection.release();
          // res.send({
          //   success: "true"
          // })
        } catch(err) {
          // console.log("Query Error")
          // await connection.rollback();
          // connection.release();
          // res.send({
          //   error: "Query Error",
          //   err
          // })
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

router.post('/delete', async(req, res) => {
  try {
    console.log("DB connection /admin/delete")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("Query Start / admin / delete")
      let sql = "DELETE FROM food_items WHERE food_id = ?"
      let value = req.body.food_id
      
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

router.post('/modify', async(req, res) => {
  try {
    console.log("DB connection /admin/modify")
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("Query Start /admin/modify")

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


module.exports = router;