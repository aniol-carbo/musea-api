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
    res.status(404).send('No museums found')
  }
})

router.get('/museums/:museumId', async (req, res) => {
  const id = req.params.museumId
  try {
    const doc = await Museum.findById(id)
    if (!doc) {
      throw new Error('no document found')
    } else {
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
        for (const expoId of doc.expositions) {
          try {
            const exp = await Exposition.findById(expoId)
            if (!exp) {
              throw new Error('no document found')
            } else {
              result.expositions.push(exp)
            }
          } catch {
            res.status(404).send('This museum has an invalid exposition')
          }
        }
      }
      if (doc.restrictions.length > 0) {
        for (const restrictionId of doc.restrictions) {
          try {
            const restr = await Restriction.findById(restrictionId)
            if (!restr) {
              throw new Error('no document found')
            } else {
              result.restrictions.push(restr)
            }
          } catch {
            res.status(404).send('This museum has an invalid restriction')
          }
        }
      }
      res.json({ museum: result })
    }
  } catch {
    res.status(404).send('There is no museum for such id')
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
        for (const elem of doc.works) {
          artworkId = elem
          try {
            const work = await Work.findById(artworkId)
            if (!work) {
              throw new Error('no document found')
            } else {
              result.works.push(work)
            }
          } catch {
            res.status(404).send('This exposition has an invalid artwork')
          }
        }
      }
      res.json({ exposition: result })
    }
  } catch {
    res.status(404).send('There is no exposition for such id')
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
    res.status(404).send('There is no artwork for such id')
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
      for (const elem of docs) {
        const user = {
          username: elem.userId,
          fullName: elem.name,
          premium: elem.premium
        }
        result.push(user)
      }
      res.json({ users: result })
    }
  } catch {
    res.status(404).send('No users found')
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
    res.status(404).send('There is no user for such id')
  }
})

// GET /users/username/likes to get all liked artworks by the user
router.get('/users/:userId/likes', async (req, res) => {
  const id = req.params.userId
  try {
    const doc = await User.findOne({ userId: id }, 'likes')
    if (!doc) {
      throw new Error('no document found')
    } else {
      const result = []
      for (const elem of doc.likes) {
        const artwork = await Work.findOne({ _id: elem }, 'image')
        const obj = {
          artworkId: elem,
          image: artwork.image
        }
        result.push(obj)
      }
      res.json({ likes: result })
    }
  } catch {
    res.status(404).send('There is no user for such id')
  }
})

// GET /users/username/favourites to get all liked museums by the user
router.get('/users/:userId/favourites', async (req, res) => {
  const id = req.params.userId
  try {
    const doc = await User.findOne({ userId: id }, 'favourites')
    if (!doc) {
      throw new Error('no document found')
    } else {
      const result = []
      for (const elem of doc.favourites) {
        const museum = await Museum.findOne({ _id: elem }, 'image')
        const obj = {
          museumId: elem,
          image: museum.image
        }
        result.push(obj)
      }
      res.json({ favourites: result })
    }
  } catch {
    res.status(404).send('There is no user for such id')
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
    for (const day of days) {
      const dayName = day.day_info.day_text
      const hours = day.day_raw
      const fullDay = {
        dayName: dayName,
        hours: hours
      }
      afluenceInfo.push(fullDay)
    }
    res.json({ info: { name: fullName, horari: horari, isOpen: isOpen, afluence: afluenceInfo } })
  } catch (err) {
    res.status(500).send('External API server error')
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

router.post('/museums/:museumId', async (req, res) => {
  const museum = req.params.museumId
  const name = req.query.name
  const room = req.query.room
  const descriptions = {
    ca: req.query.ca,
    es: req.query.es,
    en: req.query.en
  }

  // creating the new expo
  const exposition = new Exposition({ _id: ObjectId(), name: name, room: room, descriptions: descriptions, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
  const exp = await exposition.save()

  // get the museum expos array
  let expositions = []
  try {
    const doc = await Museum.findById(museum)
    if (!doc) {
      throw new Error('no document found')
    } else {
      expositions = doc.expositions
      const expoId = ObjectId(exp.id)
      expositions.push(expoId)
    }
  } catch {
    res.stuatus(404).send('There is no museum for such id')
  }

  // updating the museum (add the expo to its expos array)
  try {
    const updated = await Museum.updateOne({ _id: museum }, {
      expositions: expositions
    })
    if (!updated) {
      throw new Error('error when updating the document')
    } else {
      res.redirect('/museums/' + museum)
    }
  } catch {
    res.status(500).send('Could not update the museum with the new exposition')
  }
})

router.post('/museums/:museumId/:expositionId', async (req, res) => {
  const museum = req.params.museumId
  const exposition = req.params.expositionId
  const title = req.query.title
  const author = req.query.author
  const score = req.query.score
  const type = req.query.type
  const descriptions = {
    ca: req.query.ca,
    es: req.query.es,
    en: req.query.en
  }

  // creating the new artwork
  const artwork = new Work({ _id: ObjectId(), title: title, author: author, score: score, type: type, descriptions: descriptions, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
  let work
  try {
    work = await artwork.save()
    if (!work) {
      throw new Error('no document found')
    }
  } catch {
    res.status(500).send('Could not save the new artwork')
  }

  // get the expo's works array
  let works = []
  try {
    const doc = await Exposition.findById(exposition)
    if (!doc) {
      throw new Error('no document found')
    } else {
      if (doc.works != null) works = doc.works
      const workId = ObjectId(work.id)
      works.push(workId)
    }
  } catch {
    res.status(404).send('There is no expo for such id')
  }

  // updating the museum (add the expo to its expos array)
  try {
    const updated = await Exposition.updateOne({ _id: exposition }, {
      works: works
    })
    if (!updated) {
      throw new Error('error when updating the document')
    } else {
      res.redirect('/museums/' + museum + '/' + exposition)
    }
  } catch {
    res.status(500).send('Could not update the exposition with the new artwork')
  }
})

// POST /users with params username, fullName, bio and profilePic
router.post('/users', (req, res) => {
  const username = req.query.username
  const fullName = req.query.fullName
  const bio = req.query.bio
  const profilePic = req.query.profilePic === undefined ? 'https://museaimages1.s3.amazonaws.com/users/unknown.jpg' : req.query.profilePic
  const user = new User({ _id: ObjectId(), userId: username, name: fullName, bio: bio, favourites: [], points: 0, profilePic: profilePic, premium: false, visited: [] })
  user.save((e, us) => {
    if (e) console.log(e)
    res.send(us)
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

// POST /users/userName/likes with params artwork=artworkId
router.post('/users/:userId/likes', async (req, res) => {
  const user = req.params.userId
  const artwork = ObjectId(req.query.artwork)
  let likes = []
  try {
    const doc = await User.findOne({ userId: user }, 'likes')
    likes = doc.likes
    if (!doc) {
      throw new Error('no document found')
    }
    let found = false
    for (const aw of likes) {
      if (aw.equals(artwork)) found = true
    }
    if (found) {
      const index = likes.indexOf(artwork)
      likes.splice(index, 1)
    } else {
      likes.push(artwork)
    }
    await User.updateOne({ userId: user }, {
      likes: likes
    })
    res.redirect('/users/' + user)
  } catch {
    res.status(404).send('There is no user for such id')
  }
})

// POST /users/userName/favourites with params museum=museumId
router.post('/users/:userId/favourites', async (req, res) => {
  const user = req.params.userId
  const museum = ObjectId(req.query.museum)

  let favourites = []
  try {
    const doc = await User.findOne({ userId: user }, 'favourites')
    favourites = doc.favourites
    if (!doc) {
      throw new Error('no document found')
    }
    if (favourites.includes(museum)) {
      const index = favourites.indexOf(museum)
      favourites.splice(index, 1)
    } else {
      favourites.push(museum)
    }
    await User.updateOne({ userId: user }, {
      favourites: favourites
    })
    res.redirect('/users/' + user)
  } catch {
    res.status(404).send('There is no user for such id')
  }
})

module.exports = router
