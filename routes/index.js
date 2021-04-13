const express = require('express')
const axios = require('axios')
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

router.get('/museums', async (req, res) => {
  try {
    const docs = await Museum.find()
    if (!docs) {
      throw new Error('no document found')
    }
    res.json({ museums: docs })
  } catch {
    res.json({ museums: 'No museums found' })
  }
})

router.get('/museums/:museumId', async (req, res) => {
  const id = req.params.museumId
  try {
    const doc = await Museum.findById(id)
    if (!doc) {
      throw new Error('no document found')
    } else {
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
      if (doc.expositions.length > 0) {
        for (let i = 0; i < doc.expositions.length; i++) {
          expoId = doc.expositions[i]
          await Exposition.findById(expoId, (erro, exp) => {
            if (erro) console.log(erro)
            result.expositions.push(exp)
          })
        }
      }
      if (doc.restrictions.length > 0) {
        for (let j = 0; j < doc.restrictions.length; j++) {
          restrictionId = doc.restrictions[j]
          await Restriction.findById(restrictionId, (error, restr) => {
            if (error) console.log(error)
            result.restrictions.push(restr)
          })
        }
      }
      res.json({ museum: result })
    }
  } catch {
    res.json({ museum: 'There is no museum for such id' })
  }
})

router.get('/museums/:museumId/:expositionId', async (req, res) => {
  const id = req.params.expositionId
  try {
    const doc = await Exposition.findById(id)
    if (!doc) {
      throw new Error('no document found')
    } else {
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
          await Work.findById(artworkId, (error, work) => {
            if (error) console.log(error)
            result.works.push(work)
          })
        }
      }
      res.json({ exposition: result })
    }
  } catch {
    res.json({ exposition: 'There is no exposition for such id' })
  }
})

router.get('/museums/:museumId/:expositionId/:workId', async (req, res) => {
  const id = req.params.workId
  try {
    const doc = await Work.findById(id)
    if (!doc) {
      throw new Error('no document found')
    }
    res.json({ work: doc })
  } catch {
    res.json({ work: 'There is no artwork for such id' })
  }
})

// GET /users to get all the user's info
router.get('/users', async (req, res) => {
  try {
    const docs = await User.find()
    if (!docs) {
      throw new Error('no document found')
    } else {
      const result = []
      for (let i = 0; i < docs.length; i++) {
        const user = {
          username: docs[i].userId,
          fullName: docs[i].name,
          premium: docs[i].premium
        }
        result.push(user)
      }
      res.json({ users: result })
    }
  } catch {
    res.json({ users: 'No users found' })
  }
})

// GET /users/username to get the user's info
router.get('/users/:userId', async (req, res) => {
  const id = req.params.userId
  try {
    const doc = await User.findOne({ userId: id })
    if (!doc) {
      throw new Error('no document found')
    }
    res.json({ user: doc })
  } catch {
    res.json({ user: 'There is no user for such id' })
  }
})

// GET /info with query params name=museumName and city=museumCity
router.get('/info', async (req, res, next) => {
  try {
    const name = req.query.name
    const city = req.query.city
    const key = process.env.GOOGLE_API_KEY
    const bestTimeKey = process.env.BESTTIME_API_KEY
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}%20${city}&inputtype=textquery&fields=place_id,photos,formatted_address,name,rating,opening_hours,geometry&key=${key}`
    )
    const placeId = data.candidates[0].place_id
    const address = data.candidates[0].formatted_address
    const details = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,opening_hours,rating,formatted_phone_number&key=${key}`
    )
    const fullName = details.data.result.name
    const horari = details.data.result.opening_hours.weekday_text
    const isOpen = details.data.result.opening_hours.open_now
    const afluence = await axios.post(`https://besttime.app/api/v1/forecasts?api_key_private=${bestTimeKey}&venue_name=${fullName}&venue_address=${address}`
    )
    const days = afluence.data.analysis
    const afluenceInfo = []
    for (const day in days) {
      const dayName = days[day].day_info.day_text
      const hours = days[day].day_raw
      const fullDay = {
        dayName: dayName,
        hours: hours
      }
      afluenceInfo.push(fullDay)
    }
    res.json({ info: { name: fullName, horari: horari, isOpen: isOpen, afluence: afluenceInfo } })
  } catch (err) {
    next(err)
  }
})

// ----------------- POST -------------------- //

router.post('/museums', (req, res) => {
  const name = req.query.name
  const address = req.query.address
  const city = req.query.city
  const country = req.query.country
  const descriptions = {
    ca: req.query.ca,
    es: req.query.es,
    en: req.query.en
  }
  const museum = new Museum({ _id: ObjectId(), name: name, address: address, city: city, country: country, descriptions: descriptions, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
  museum.save((e, mus) => {
    console.log(e)
    res.send(mus)
  })
})

// POST /users/userName with params bio=newBio
router.post('/users/:userId', async (req, res) => {
  const user = req.params.userId
  const bio = req.query.bio
  const updated = await User.updateOne({ userId: user }, {
    bio: bio
  })
  res.json(updated)
})

module.exports = router
