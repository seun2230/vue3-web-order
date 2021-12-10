const pool = require('../db/index');

// const bcrypt = require('bcrypt')
const passport = require('passport')
const passportJWT = require('passport-jwt')

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
      const value = user_id

      const [rows] = await connection.query(sql, value)
        
      user = rows[0]
        
      console.log("localVerify Start Query")
      
      //  아이디가 존재 하지 않을 경우
      if(!rows[0]) {
          return done("아이디가 존재 하지 않습니다.", false)
        }

      // const checkPassword = await bcrypt.compare(password, user.password)
      const checkPassword = user_password === user.user_password

      //  checkPassword true false
      if (!checkPassword) {
        return done("비밀번호가 틀렸습니다.", false);
      }
      
      return done(null, user);
    } catch(err) {
      console.log("Query Error")
      return done(err);
    } 
   } catch(err) {
    console.log("DB Error")
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
    const connection = await Pool.getConnection(async conn => conn);
    let userInfo;
    try {
      const sql = "SELECT * FROM user WHERE user_id = ?"
      const value = payload.user_id
      await connection.query(sql, value, (err, rows) => {
        if(!rows[0]) {
          return done(null, false)
        }
        userInfo = rows[0]

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

//  passport-jwt JWTStrategy (options, verify)
//  options : 요청에서 토큰을 추출하거나 확인하는 방법을 제어하는 옵션이 포함된 객체 리터럴
//  verify : 매개변수가 있는 함수 => verify(jwt-payload, done)
//    jwt-payload : 디코딩된 JWT Payload를 포함하는 객체 리터럴입니다.
//    done : done(err, user, info)를 수확하는 passport 첫번째 콜백?? 이건 좀 더 공부 해보자

//  passport-local LocalStrategy


module.exports = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify))
  passport.use(new JWTStrategy(JWTStrategyOption, jwtVerify))
}