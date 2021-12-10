const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.cookie.split('=')[1].trim();
    req.decoded = jwt.verify(token, process.env.UUID_SECRET);
    return next()
  } catch (err) {
    console.log("error", err)
    if (err.name == 'TokenExpiredError') {
      return res.status(419).json({ success: false, message: "token 만료" })
    }
    return res.status(401).json({ success: false, message: "token이 유효하지 않습니다."})
  }
}

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];
//   console.log('Bearer Token!:', req.headers);
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1].trim();
//     req.token = bearerToken;
//     console.log('req.token on verified:', req.token);
//     next();
//   } else {
//     console.log('req.headers on verifying:', req.headers);
//     console.log('req.token on verifying:', req.token);
//     console.log('Unauthorized on verifying token');
//     res.sendStatus(401);
//   }
// }