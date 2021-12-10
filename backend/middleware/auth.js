const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  try {
    console.log("Verify Token Start")
    console.log("auth.js req.body", req.body)
    console.log("내사랑 쿠키 ㅠㅜㅠㅜ",req.headers.cookie)
    const token = req.headers.cookie.split('=')[1].trim();
    
    req.decoded = jwt.verify(token, process.env.UUID_SECRET);
    console.log("req.decoded",req.decoded)
    
    return next()
  } catch (err) {
    console.log("error", err)
    if (err.name == 'TokenExpiredError') {
      return res.status(419).json({ success: false, message: "token 만료" })
    }
    return res.status(401).json({ success: false, message: "token이 유효하지 않습니다."})
  }
}