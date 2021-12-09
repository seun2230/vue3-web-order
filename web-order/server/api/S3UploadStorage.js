import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

// import fs, { access } from 'fs';

AWS.config.region = 'ap-northeast-2';

const s3 = AWS.S3({
  accessKeyId: process.env.S3KEYID,
  secretAccessKey: process.env.S3SECRETACCKEY, 
  // region: process.env.S3REGION
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

exports.upload = multer({ storage: storage});