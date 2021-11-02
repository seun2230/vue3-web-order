const { query } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const path = require('path');
const { error } = require('console');
const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123478',
  database: 'test_db'
})

connection.connect();

// console.log(app);
var port = "3000";
app.set('port', port);

app.set('data', []);

// app.get('/', (req, res) => {
//   res.send('테스트');
// })

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));


app.get('/menu', (req, res) => {
  connection.query('SELECT * from food_items',(error, results) => {
    if (error) {
      res.status(500).send("실패하였습니다.")
    } else {
      //var results ='rows:' + JSON.stringify(rows);
      console.log("result", results);
      res.header("Access-Control-Allow-Origin", "*").send(results)
      //(path.join(__dirname, '../public/js/index.html'));
      //.header("Access-Control-Allow-Origin", "*")
    }
  })
});

app.get('/menu/:_id', (req, res) => {
 connection.query('select from food_items where _id = ?', [req.params._id], (err, results) => {
    if(err) {
      res.status(500).send("500 status error");
    } else {
      console.log(results)
      res.redirect('/menu');
     }
   }
 )
  
});

app.post('/menu/pay', (req, res) => {
  var payment = {
    '_id': req.body.id,
    'name': req.body.name,
    'price': req.body.price
  };

  connection.query('insert into food_items set ?', payment, (err, results) => {
    if(err) throw error;
    console.log(results)
    res.send('데이터 확인', results)
  })
}) 


//app.post('/menu/myData', (req, res,) => {
  // const post = req.body.post;
  // console.log(post);
  // res.send(post);

  // const axios = require('axios')
  // axios.post('http://localhost:8080/',{
  //   name : 'balmostory'
  // }).then((res)=>{
  // console.log(res)
  // })
//})

module.exports = app;
