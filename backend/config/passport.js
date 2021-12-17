const pool = require('../db/index');
const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')

const { ExtractJwt } = passportJWT;

const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

const LocalStrategyOption = {
  usernameField: "user_id",
  passwordField: "user_password"
}

async function localVerify(user_id, user_password, done) {
  try {
    console.log("localVerify Start Connection")
    const connection = await pool.getConnection(conn => conn);
    try {
      const sql = 'SELECT * FROM users WHERE user_id = ?'
      console.log("localVerify", user_id)
      console.log("localVerify", user_password)
      const value = [ user_id ]

      const [rows] = await connection.query(sql, value)
      
      console.log("localVerify", rows[0])
      let user = rows[0]
              
      //  아이디가 존재 하지 않을 경우
      if(rows[0] === undefined) {
          return done("아이디가 존재 하지 않습니다.", false)
        }

      const checkPassword = await bcrypt.compare(user_password, user.user_password)
      console.log("localVerify", checkPassword)

      if (!checkPassword) {
        return done("비밀번호가 틀렸습니다.", false);
      }
      
      return done(null, user);
    } catch(err) {
      console.log("Query Error")
      console.log(err)
      return done(err);
    } 
   } catch(err) {
    console.log("DB Error")
    console.log(err)
    return done(err);
  }
}

const JWTStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.UUID_SECRET
};

async function jwtVerify(payload, done) {
  try {
    console.log("payload : ", payload)
    console.log("done : ", done)
    const connection = await pool.getConnection(async conn => conn);
    let userInfo;
    try {
      const sql = "SELECT * FROM user WHERE user_id = ?"
      const value = payload.user_id
      await connection.query(sql, value, (err, rows) => {
        if(!rows[0]) {
          return done(null, false)
        }
        userInfo = rows[0]
        console.log("jwtVerify", rows[0])
        return done(null, userInfo)
      })
    } catch(err) {
      console.log("Query Error")
      console.log("Error : ", err)
      return done(err)
    }
  } catch(err) {
    console.log("DB Error")
    console.log("Error : ", err)
    return done(err)
  }
}

module.exports = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify))
  passport.use(new JWTStrategy(JWTStrategyOption, jwtVerify))
}