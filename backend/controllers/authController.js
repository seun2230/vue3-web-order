const passport = require('passport')
const jwt = require('jsonwebtoken')
const pool = require('../db');

const login = async(req, res, next) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    await passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ success: false, message: err })
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          console.log("authController_login_err", err)
          return res.send(err)
        }
        const token = jwt.sign(
          { user_id: user.user_id,
            user_name: user.user_name },
          process.env.UUID_SECRET,
          { expiresIn: "1h" }
        )

        const sql = "SELECT * FROM users WHERE user_id=?"
        const value = [ user.user_id ]

        const [rows] = await connection.query(sql, value);
        console.log(rows[0])
        res.cookie('auth', token, { maxAge: 3600000 , sameSite: "lax" , httpOnly: true})
        res.send({
          "user_id":rows[0].user_id,
          "user_name": rows[0].user_name,
          "token": token})
        next();
      })
    }) (req, res)
  } catch (err) {
    console.log("Error", err)
    console.error(err)
    res.send(err)
    return next(err)
  }
}

const KaKaoLogin = async(req, res, next) => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    await passport.authenticate('kakao', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ success: false, message: err })
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          console.log("authController_login_err", err)
          return res.send(err)
        }
        const token = jwt.sign(
          { user_id: user.user_id,
            user_name: user.user_name },
          process.env.UUID_SECRET,
          { expiresIn: "1h" }
        )

        const sql = "SELECT * FROM users WHERE user_id=?"
        const value = [ user.user_id ]

        const [rows] = await connection.query(sql, value);
        console.log(rows[0])
        res.cookie('auth', token, { maxAge: 3600000 , sameSite: "lax" , httpOnly: true})
        res.send({
          "user_id":rows[0].user_id,
          "user_name": rows[0].user_name,
          "token": token})
        next();
      })
    }) (req, res)
  } catch (err) {
    console.log("Error", err)
    console.error(err)
    res.send(err)
    return next(err)
  }
}

module.exports = {
  login,
  KaKaoLogin,
}