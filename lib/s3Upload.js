const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')
const mime = require('mime-types')

require('dotenv').config()

const filepath = process.argv[2]
const filepathArray = filepath.split('/')
const filename = filepathArray[filepathArray.length - 1]

const keyName = filename.split('.')[0]
const fileType = mime.lookup(process.argv[2])
const extension = mime.extension(fileType)

const fileStream = fs.createReadStream(filepath)

const params = {
  Bucket: process.env.S3_BUCKET,
  Key: `${Date.now().toString()}${keyName}.${extension}`,
  Body: fileStream,
  ACL: 'public-read',
  ContentType: mime.contentType(fileType)
}

s3.upload(params, function (err, data) {
  if (err) {
    console.log(err)
    return
  }
  return console.log(data)
})
