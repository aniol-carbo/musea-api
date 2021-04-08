const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
let url
if (process.env.MODE !== 'test') url = process.env.DATABASE_URL
else url = process.env.TEST_DATABASE_URL
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

router.get('/', (req, res) => {
  res.render('index')
})

const Museum = require('../models/museum')
const Exposition = require('../models/exposition')
const Work = require('../models/artwork')
const User = require('../models/user')
const Restriction = require('../models/restriction')

router.get('/museums', (req, res) => {
  // eslint-disable-next-line array-callback-return
  Museum.find((err, docs) => {
    if (err) console.log(err)
    res.json({ museums: docs })
  })
})

router.get('/museums/:museumId', (req, res) => {
  const id = req.params.museumId
  // eslint-disable-next-line array-callback-return
  Museum.findById(id, (err, doc) => {
    if (err) console.log(err)
    let expoId, restrictionId
    const result = {
      _id: doc._id,
      name: doc.name,
      address: doc.address,
      city: doc.city,
      country: doc.country,
      location: doc.location,
      expositions: [],
      descriptions: doc.descriptions,
      image: doc.image,
      restrictions: []
    }
    if (doc.expositions.length > 0 || doc.restrictions.length > 0) {
      for (let i = 0; i < doc.expositions.length; i++) {
        expoId = doc.expositions[i]
        Exposition.findById(expoId, (error, expo) => {
          if (error) console.log(error)
          result.expositions.push(expo)
          if (i === result.expositions.length - 1) {
            for (let j = 0; j < doc.restrictions.length; j++) {
              restrictionId = doc.restrictions[j]
              Restriction.findById(restrictionId, (error, expo) => {
                if (error) console.log(error)
                result.restrictions.push(expo)
                if (j === result.restrictions.length - 1) res.json({ museum: result })
              })
            }
          }
        })
      }
    } else {
      res.json({ museum: result })
    }
  })
})

router.get('/museums/:museumId/:expositionId', (req, res) => {
  const id = req.params.expositionId
  // eslint-disable-next-line array-callback-return
  Exposition.findById(id, (err, doc) => {
    if (err) console.log(err)
    let artworkId
    const result = {
      _id: doc._id,
      name: doc.name,
      room: doc.room,
      descriptions: doc.descriptions,
      works: [],
      image: doc.image
    }
    if (doc.works.length > 0) {
      for (let i = 0; i < doc.works.length; i++) {
        artworkId = doc.works[i]
        Work.findById(artworkId, (error, work) => {
          if (error) console.log(error)
          result.works.push(work)
          if (i === result.works.length - 1) res.json({ exposition: result })
        })
      }
    } else {
      res.json({ exposition: result })
    }
  })
})

router.get('/museums/:museumId/:expositionId/:workId', (req, res) => {
  const id = req.params.workId
  // eslint-disable-next-line array-callback-return
  Work.findById(id, (err, doc) => {
    if (err) console.log(err)
    res.json({ work: doc })
  })
})

router.get('/users/:userId', (req, res) => {
  const id = req.params.userId
  // eslint-disable-next-line array-callback-return
  User.findOne({ userId: id }, (err, doc) => {
    if (err) console.log(err)
    res.json({ user: doc })
  })
})

router.post('/museums', (req, res) => {
  const name = req.query.name
  const address = req.query.address
  const city = req.query.city
  const country = req.query.country
  const museum = new Museum({ _id: ObjectId(), name: name, address: address, city: city, country: country })
  museum.save((e, mus) => {
    console.log(e)
    res.send(mus)
  })
  // Museum.create(museum, function (e, mus) {
  //   console.log(e)
  //   res.send(mus)
  // })
})

module.exports = router
