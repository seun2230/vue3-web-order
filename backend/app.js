const express = require('express');

const mysql = require('mysql2');

const path = require('path');
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

// app.get('/', (req, res) => {
//   res.send('테스트');
// })

app.get('/', (req, res) => {
  connection.query('SELECT * from food_items',(error, results) => {
    if (error) {
      console.log(error)
      res.send("실패하였습니다.")
    } else {
      //var results ='rows:' + JSON.stringify(rows);
      console.log("result", results);
      res.header("Access-Control-Allow-Origin", "*").send(results)
      //(path.join(__dirname, '../public/js/index.html'));
      //.header("Access-Control-Allow-Origin", "*")
    }
  })
});

// app.get('/test/:id', (req, res) => {
//   // const user
//   connection.query('SELECT * from food_items WHERE id=?', (err, row, results) =>{
//     console.log('row', row);
//     console.log('result: ', results);
//     res.json(results);
//   })
// })
// app.post('/', function(req, res) {
//   // var id = req.body.id;
//   // var info = req.body.info;
//   // var price = req.body.price;
//   const { id, info, price} = req.query
//   try {
//     const result = connection.query('insert into food_items set ?' ,
//       {id: id, info: info, price: price})

//   } catch (error){
//     return res.status(500)
//   }

//   const result = {id:id, info: info, price: price}
//   connection.query('insert into food_items set ?', result, function(rows) {
//     console.log("테스트 성공:", rows);
//     res.send(result)
//   })
// })


// app.post("/food", (req, res) => {
//   console.log(req);
// })

//app.listen(app.get("port"));
//console.log(app.get("port"));


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


//app.use('/', indexRouter);
//app.use('/users', usersRouter);




module.exports = app;
