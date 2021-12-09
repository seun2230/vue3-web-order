const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// import fs, { access } from 'fs';

aws.config.region = 'ap-northeast-2';

const s3 = new aws.S3({
  accessKeyId: process.env.S3KEYID,
  secretAccessKey: process.env.S3SECRETACCKEY, 
});

const storage = multerS3({
  s3: s3, 
  bucket: process.env.BUCKETNAME, //bucket 이름 
  contentType: multerS3.AUTO_CONTENT_TYPE, 
  acl: 'public-read-write', //읽고 쓰기 모두 허용 
  key: function (req, file, cb) { 
    let extension = path.extname(file.originalname); 
    cb(null, Date.now().toString() + extension) 
  }
});

exports.Upload = multer({ storage: storage});