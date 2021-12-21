const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const path = require('path');
const sharp = require('sharp')

const s3 = new AWS.S3({ 
  accessKeyId: process.env.S3KEYID, 
  secretAccessKey: process.env.S3SECRETACCKEY, 
  region: process.env.S3REGION, 
});

const storage = multerS3({
  s3: s3, 
  bucket: process.env.BUCKETNAME, //bucket 이름 
  contentType: multerS3.AUTO_CONTENT_TYPE,
  shouldTransform: true,
  transforms: [
    {
      id: "resized",
      key: function (req, file, cb) { 
        let extension = path.extname(file.originalname); 
        cb(null, Date.now().toString() + extension) 
      },
      transform: function(req, res, cb) {
        cb(null, sharp().resize(500, 500));
      }
    }
  ],
  acl: 'public-read-write', //읽고 쓰기 모두 허용 
});

exports.upload = multer({ storage: storage});