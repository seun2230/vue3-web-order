require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer')

const passport = require('passport')
const passportConfig = require('./config/passport')
const authRouter = require('./routes/authRouter')
const pool = require('./db/index');
const { verifyToken } = require('./middleware/auth');

const app = express();

const storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename (req, file, callback) {
    callback(null, file.originalname)
  }
}) 

const upload = multer({
  storage: storage,
})

var port = "3000";
app.set('port', port);
app.set('view engine', 'pug');

// 서로 다른 도메인끼리 주고 받음.
app.use(cors({ credentials: true, origin: true}))
app.use(express.json())
app.use(passport.initialize())
app.use(authRouter)
passportConfig();
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

app.post('/foods/post', verifyToken, async(req, res) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      console.log(req.body[1]);
      
      let sql = 'INSERT INTO order_num (order_total_price, users_user_id, order_date) VALUES(?, ?, ?)';
      
      let date = new Date(); 
      let params = [ req.body[1], req.decoded.user_id, date ]
      console.log(params);
      await connection.beginTransaction();

      await connection.query(sql, params)

      const [test] = await connection.query('SELECT max(id_order_num) FROM order_num')
      console.log("order_num Table: ", test);


      for (let i = 0; i < req.body[0].length; i++) { 
        console.log("상품 수량: ", req.body[0][i].quantity); 
        console.log("상품 번호: ", req.body[0][i].food_id);

        let params = [ 
          req.body[0][i].quantity,
          req.body[0][i].food_id,
          test[0]['max(id_order_num)']
        ];
        console.log('test2', params);

        let sql = 'INSERT INTO order_list(order_quantity, food_items_food_id, order_num_id_order_num) VALUES (?, ?, ?)';
        await connection.query(sql, params) 
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

app.get('/order', async (req, res) => {
  const connection = await pool.getConnection(async conn => conn);
   
  await connection.beginTransaction();
  let sqls = 'select * from order_list as A LEFT JOIN order_num as B ON A.order_num_id_order_num = B.id_order_num LEFT JOIN food_items as F ON F.food_id = A.food_items_food_id';
  const [rows] = await connection.query(sqls)
  console.log("assa",rows);
      
  await connection.commit();
  connection.release();
  res.send(rows)

})

app.post('/orderDate', async(req, res) => {
  console.log(req.body);
  const connection = await pool.getConnection(async conn => conn);

  let value = [
    req.body[0],
    req.body[1]
  ]
  let sqls = 'select * from order_list as A LEFT JOIN order_num as B ON A.order_num_id_order_num = B.id_order_num '
      + 'LEFT JOIN food_items as F ON F.food_id = A.food_items_food_id '
      + 'WHERE order_date between ? AND ?';
  
  const [rows] = await connection.query(sqls, value)
  connection.release();
  res.send(rows);
})
module.exports = app;
