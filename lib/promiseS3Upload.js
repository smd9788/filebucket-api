'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')
const mime = require('mime-types')

require('dotenv').config()
const promiseS3Upload = function (req) {
  return new Promise((resolve, reject) => {
    const filepath = req.file.path
    // const filepathArray = filepath.split('/')
    // const filename = filepathArray[filepathArray.length - 1]

    // const keyName = req.file.originalname.split('.')[0]
    const fileType = mime.lookup(req.file.mimetype)
    const extension = mime.extension(fileType)

    const fileStream = fs.createReadStream(filepath)

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${req.file.filename}.${extension}`,
      Body: fileStream,
      ACL: 'public-read',
      ContentType: req.file.mimetype
    }

    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = promiseS3Upload
