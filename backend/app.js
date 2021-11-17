const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123478',
  database: 'test_db'
})

connection.connect();

var port = "3000";
app.set('port', port);
app.set('view engine', 'pug');

app.use(cors())
app.use(express.json())
app.use('/upload', express.static('uploads'));

app.get('/upload',)

app.post('/upload', upload.array('file'), (req, res) => {
  console.log("req.files", req.files);
  console.log("req.body", req.body);
  
  let image = []
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

  connection.query(sql, data, (err, res) => {
    //if (err) throw err;
    //console.log("file upload")
    console.log("er", err)
    console.log("result : ", res)
  })
  
  // console.log(req.files);
  // res.send(req.files)
  res.render('upload')
});

// Menu food_items information
app.get('/foods', (req, res) => {
  connection.query('SELECT * from food_items',(error, results) => {
    if (error) {
      res.status(500).send("실패하였습니다.")
    } else {
      console.log("result", results);
      res.header("Access-Control-Allow-Origin", "*").send(results)
      //.header("Access-Control-Allow-Origin", "*")
    }
  })
});

app.get('/foods/:id', (req, res) => {
  console.log(req.body)
  const { id } = req.body
 connection.query(`select from food_items where id = '${id}'`, (err, results) => {
  if(err) {
     res.status(500).send("500 status error");
   } else {
     console.log(results)
     res.redirect('/menu');
    }
  })
});

// Menu CartItem Information
app.post('/foods/pay', (req, res) => {
  // console.log(req.body[0].name);
  // console.log(req.body[1].name);
  // console.log(req.body[2].name);   
 // console.log("data", req.body)
  //console.log("req.body", req.body[0].id)
  for (let i = 0; i < req.body.length; i++) {
    
    let data = [ 
      req.body[i].id,
      req.body[i].name, 
      req.body[i].price, 
      req.body[i].count
    ];

    let sql = 'INSERT INTO order_list(id_order_list, order_quantity, food_items_food_id, order_num_id_order_num) VALUES (?,?,?,?)';
    
    connection.query(sql, data, (err, result) => {
      console.log(result)
      
      //if (err) {
        //console.log(err)
        //return;
        // res.redirect('/menu');
      //} else {
      //  console.log(result)
       // res.send(result)
      //}
    })
  }
});


module.exports = app;
