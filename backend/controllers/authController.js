const passport = require('passport')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const login = async(req, res, next) => {
  try {
    console.log("authController func login start")
    const connection = await pool.getConnection(async conn => conn);
    await passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        console.log("error : ", err)
        console.log('user : ', user)
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
        const value = [
          user.user_id
        ]

        const [rows] = await connection.query(sql, value);
  
        res.json({ token, rows })
      })
    }) (req, res)
  } catch (err) {
    console.log("Error", err, "ㅋㅋ")
    console.error(err)
    return next(err)
  }
}

const check = (req, res) => {
  console.log("authController_check : ", req.decode)
  res.json(req.decoded)
}

module.exports = {
  login,
  check
}