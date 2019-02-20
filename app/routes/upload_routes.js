const express = require('express')
const Upload = require('../models/upload')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const promiseUpload = require('../../lib/s3uploadPromise.js')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// INDEX
// GET /uploads
router.get('/uploads', requireToken, (req, res, next) => {
  Upload.find()
    .then(uploads => {
      return uploads.map(upload => upload.toObject())
    })
    .then(uploads => res.status(200).json({ uploads: uploads }))
    .catch(next)
})

// SHOW
// GET /uploads/5a7db6c74d55bc51bdf39793
router.get('/uploads/:id', requireToken, (req, res, next) => {
  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => res.status(200).json({ upload: upload.toObject() }))
    .catch(next)
})

// CREATE
// POST /uploads
router.post('/uploads', requireToken, upload.single('image'), (req, res, next) => {
  const owner = req.user.id
  const metaTitle = req.body.title
  const tag = req.body.tag
  promiseUpload(req)
    .then(response => {
      return Upload.create({url: response.Location, title: metaTitle, tag: tag, owner: owner})
    })
    .then(newUpload => {
      res.status(201).json({ upload: newUpload.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /uploads/5a7db6c74d55bc51bdf39793
router.patch('/uploads/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.upload.owner

  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      requireOwnership(req, upload)
      return upload.update(req.body.upload)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /uploads/5a7db6c74d55bc51bdf39793
router.delete('/uploads/:id', requireToken, (req, res, next) => {
  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      requireOwnership(req, upload)
      upload.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
