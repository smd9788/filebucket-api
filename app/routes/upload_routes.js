
const express = require('express')
const passport = require('passport')
const Upload = require('../models/upload')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const promiseS3Upload = require('../../lib/promiseS3Upload')

// INDEX
// GET /uploads
router.get('/uploads', requireToken, (req, res, next) => {
  Upload.find()
    .then(uploads => {
      // `uploads` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return uploads.map(upload => upload.toObject())
    })
    // respond with status 200 and JSON of the uploads
    .then(uploads => res.status(200).json({ uploads: uploads }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /uploads/5a7db6c74d55bc51bdf39793
router.get('/uploads/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Upload.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "upload" JSON
    .then(upload => res.status(200).json({ upload: upload.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /uploads
router.post('/uploads', requireToken, upload.single('image'), (req, res, next) => {
  // set owner of new upload to be current user
  // req.body.upload.owner = req.user.id
  console.log('incoming req.file is', req.file)
  promiseS3Upload(req)
    .then(awsResponse => {
      return Upload.create({
        url: awsResponse.Location
      })
    })
    .then(upload => {
      res.status(201).json({
        upload: upload.toObject()
      })
    })
    .catch(next)
})

// UPDATE
// PATCH /uploads/5a7db6c74d55bc51bdf39793
router.patch('/uploads/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.upload.owner

  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, upload)

      // pass the result of Mongoose's `.update` to the next `.then`
      return upload.update(req.body.upload)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /uploads/5a7db6c74d55bc51bdf39793
router.delete('/uploads/:id', requireToken, (req, res, next) => {
  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      // throw an error if current user doesn't own `upload`
      requireOwnership(req, upload)
      // delete the upload ONLY IF the above didn't throw
      upload.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
