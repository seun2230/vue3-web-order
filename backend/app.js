const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123478',
  database: 'test_db'
})

connection.connect();

var port = "3000";
app.set('port', port);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extends: true })) 


app.get('/', (req, res) => {
  res.send('test')
})

app.get('/menu', (req, res) => {
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

// app.get('/menu/:id', (req, res) => {
//   console.log(req.body)
// const { id } = req.body
//  connection.query(`select from food_items where id = '${id}'`, (err, results) => {
//   if(err) {
//      res.status(500).send("500 status error");
//    } else {
//      console.log(results)
//      res.redirect('/menu');
//     }
//   })
// });


app.post('/menu/pay', (req, res) => {
  // console.log(req.body[0].name);
  // console.log(req.body[1].name);
  // console.log(req.body[2].name);   

  for (let i = 0; i <= req.body.length; i++) {

    let data = [ 
      req.body[i].id,
      req.body[i].name, 
      req.body[i].price, 
      req.body[i].count
    ];

    let sql = 'INSERT INTO order_list(id, name, price, count) VALUES (?,?,?,?)';
    
    connection.query(sql, data, (err, result) => {
      //console.log(result)
      if (err) {
        console.log(err)
        return;
        // res.redirect('/menu');
      } else {
        console.log(result)
        res.send(result)
      }
    })
  }
});


module.exports = app;
