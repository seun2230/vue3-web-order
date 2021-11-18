const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/index');

const app = express();

const multer  = require('multer')
const storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename (req, file, callback) {
    callback(null, file.originalname)
  }
})

var upload = multer({
  storage:storage,
})

var port = "3000";
app.set('port', port);
app.set('view engine', 'pug');

app.use(cors())
app.use(express.json())
app.use('/upload', express.static('uploads'));


app.post('/upload', upload.array('file'), async(req, res) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log("req.files", req.files);
      console.log("req.body", req.body);
      
      let image = [] 
      await connection.beginTransaction();

      for( let i = 0; i < req.files.length; i++) {
        
        image[i] = 'http://localhost:3000/upload/' + req.files[i].originalname;
      }
      console.log("imageooo ", image[0])

      let sql = 'INSERT INTO food_items' + 
      '(food_name, food_image1, food_image2, food_image3, food_info, food_price, food_category)' + 
      'VALUES (?,?,?,?,?,?,?)';

      let data = [ 
        req.body.name, 
        image[0],
        image[1],
        image[2],
        req.body.info, 
        req.body.price,
        req.body.category
      ];
    
      const [rows] = await connection.query(sql, data) 
      await connection.commit(); 
      connection.release();   // 연결 끊음
      res.send(rows);
    } catch (err) {
      console.log(err);
      await connection.rollback();
      connection.release();
    }
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
})

app.get('/foods', async (req, res) => {
  const connection = await pool.getConnection(async conn => conn);
  const [rows] = await connection.query('SELECT * from food_items')
  connection.release();
  res.send(rows);
});

app.post('/foods/post', async(req, res) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log(req.body[1]);

      let sql = 'INSERT INTO order_num (order_total_price, users_user_id) VALUES(?, ?)';

      let data = [
        req.body[1],  // order_total
        'hong'
      ]

      await connection.beginTransaction();

      await connection.query(sql, data)

      const [test] = await connection.query('SELECT max(id_order_num) From order_num')
      console.log("Test", test);

      for (let i = 0; i < req.body[0].length; i++) { 
        console.log("quantity", req.body[0][i].quantity); 
        console.log("food_id", req.body[0][i].food_id);
        let data = [ 
          req.body[0][i].quantity,
          req.body[0][i].food_id,
          test[0]['max(id_order_num)']
        ];

        let sql = 'INSERT INTO order_list(order_quantity, food_items_food_id, order_num_id_order_num) VALUES (?, ?, ?)';
        
        await connection.query(sql, data)
      } 
      await connection.commit();
      connection.release();
    } catch (err) {  
      connection.release();
      console.log(err);
      res.send(err);
    }
  } catch (err) {
    console.log('error', err);
    return false;
  }
})


module.exports = app;
