process.env.MODE = 'test'

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Museum = require('../models/museum')
const Exposition = require('../models/exposition')
const Work = require('../models/artwork')
const User = require('../models/user')
const Quizz = require('../models/quizz')
const Comment = require('../models/comment')
const Rating = require('../models/rating')
const Report = require('../models/report')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('Museums', () => {
  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    Museum.deleteMany({}, (e) => {
      if (e) console.log(e)
      Exposition.deleteMany({}, (er) => {
        if (er) console.log(er)
        Work.deleteMany({}, (err) => {
          if (err) console.log(err)
          User.deleteMany({}, (erro) => {
            if (erro) console.log(erro)
            Quizz.deleteMany({}, (error) => {
              if (error) console.log(error)
              Comment.deleteMany({}, (error2) => {
                if (error2) console.log(error2)
                Report.deleteMany({}, (error3) => {
                  if (error3) console.log(error3)
                  Rating.deleteMany({}, (error4) => {
                    if (error4) console.log(error4)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET museums', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the museums', (done) => {
      chai.request(server)
        .get('/museums')
        .end((e, res) => {
          if (e) console.log(e)
          res.should.have.status(200)
          // eslint-disable-next-line no-unused-expressions
          res.should.to.be.json
          res.body.should.be.a('object')
          res.body.museums.should.be.a('array')
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/:museumId', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a museum by the given id', (done) => {
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26a'), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      museum.save((e, mus) => {
        if (e) console.log(e)
        chai.request(server)
          .get('/museums/' + mus.id)
        //   .send(museum)
          .end((er, res) => {
            if (er) console.log(er)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.museum.should.have.property('name')
            res.body.museum.should.have.property('address')
            res.body.museum.should.have.property('city')
            res.body.museum.should.have.property('country')
            res.body.museum.should.have.property('descriptions')
            res.body.museum.descriptions.should.have.property('ca')
            res.body.museum.descriptions.should.have.property('es')
            res.body.museum.descriptions.should.have.property('en')
            res.body.museum.should.have.property('image')
            res.body.museum.should.have.property('_id').eql(mus.id)
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/:museumId/:expositionId ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET an exposition by the given id', (done) => {
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26b'), name: 'Orsay', address: 'Rue Orsay', city: 'Paris', country: 'France', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: ['6048e3baeaf9c527ba4de26d'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const exposition = new Exposition({ _id: ObjectId('6048e3baeaf9c527ba4de26d'), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          chai.request(server)
            .get('/museums/' + mus.id + '/' + expo.id)
          //   .send(museum)
            .end((err, res) => {
              if (err) console.log(err)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.exposition.should.have.property('name')
              res.body.exposition.should.have.property('room')
              res.body.exposition.should.have.property('descriptions')
              res.body.exposition.descriptions.should.have.property('ca')
              res.body.exposition.descriptions.should.have.property('es')
              res.body.exposition.descriptions.should.have.property('en')
              res.body.exposition.should.have.property('image')
              res.body.exposition.should.have.property('_id').eql(expo.id)
              res.body.exposition.should.have.property('_id').eql(mus.expositions[0])
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/:museumId/:expositionId/:artworkId ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET an artwork by the given id', (done) => {
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26b'), name: 'Orsay', address: 'Rue Orsay', city: 'Paris', country: 'France', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: ['6048e3baeaf9c527ba4de26d'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const exposition = new Exposition({ _id: ObjectId('6048e3baeaf9c527ba4de26d'), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const artwork = new Work({ _id: ObjectId('6048dd75eaf9c527ba4de26c'), title: 'Gioconda', author: 'Leonardo da Vinci', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          artwork.save((err, work) => {
            if (err) console.log(err)
            chai.request(server)
              .get('/museums/' + mus.id + '/' + expo.id + '/' + work.id)
            //   .send(museum)
              .end((error, res) => {
                if (error) console.log(error)
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.work.should.have.property('title')
                res.body.work.should.have.property('author')
                res.body.work.should.have.property('score')
                res.body.work.should.have.property('descriptions')
                res.body.work.descriptions.should.have.property('ca')
                res.body.work.descriptions.should.have.property('es')
                res.body.work.descriptions.should.have.property('en')
                res.body.work.should.have.property('image')
                res.body.work.should.have.property('_id').eql(work.id)
                res.body.work.should.have.property('_id').eql(expo.works[0])
                done()
              })
          })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/museums', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new museum', (done) => {
      const name = 'test museum'
      const address = 'test address'
      const city = 'test city'
      const country = 'test country'
      const ca = 'test ca'
      const es = 'test es'
      const en = 'test en'
      chai.request(server)
        .post(`/museums?name=${name}&address=${address}&city=${city}&country=${country}&ca=${ca}&es=${es}&en=${en}`)
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.name.should.be.a('string').equal(name)
          res.body.address.should.be.a('string').equal(address)
          res.body.city.should.be.a('string').equal(city)
          res.body.country.should.be.a('string').equal(country)
          res.body.descriptions.ca.should.be.a('string').equal(ca)
          res.body.descriptions.es.should.be.a('string').equal(es)
          res.body.descriptions.en.should.be.a('string').equal(en)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/museums/:museumId', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new exposition', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      museum.save((e, m) => {
        if (e) console.log(e)
        const name = 'test museum'
        const room = 'test room'
        const ca = 'test ca'
        const es = 'test es'
        const en = 'test en'
        chai.request(server)
          .post(`/museums/${m.id}?name=${name}&room=${room}&ca=${ca}&es=${es}&en=${en}`)
          .end((error, res) => {
            if (error) console.log(error)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.name.should.be.a('string').equal(name)
            res.body.room.should.be.a('string').equal(room)
            res.body.descriptions.ca.should.be.a('string').equal(ca)
            res.body.descriptions.es.should.be.a('string').equal(es)
            res.body.descriptions.en.should.be.a('string').equal(en)
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/museums/:museumId/:expositionId', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new artwork', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const exposition = new Exposition({ _id: ObjectId(), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          const title = 'test title'
          const author = 'test author'
          const score = 7.5
          const type = 'test type'
          const ca = 'test ca'
          const es = 'test es'
          const en = 'test en'
          chai.request(server)
            .post(`/museums/${mus.id}/${expo.id}?title=${title}&author=${author}&score=${score}&type=${type}&ca=${ca}&es=${es}&en=${en}`)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.title.should.be.a('string').equal(title)
              res.body.author.should.be.a('string').equal(author)
              res.body.score.should.be.a('number').equal(score)
              res.body.type.should.be.a('string').equal(type)
              res.body.descriptions.ca.should.be.a('string').equal(ca)
              res.body.descriptions.es.should.be.a('string').equal(es)
              res.body.descriptions.en.should.be.a('string').equal(en)
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/DELETE/museums/:museumId', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single museum', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      museum.save((e, mus) => {
        if (e) console.log(e)
        chai.request(server)
          .delete(`/museums/${mus.id}`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/DELETE/museums/:museumId/:expositionId', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single exposition', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const exposition = new Exposition({ _id: ObjectId(), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          chai.request(server)
            .delete(`/museums/${mus.id}/${expo.id}`)
            .end((err, res) => {
              if (err) console.log(err)
              res.should.have.status(200)
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/DELETE/museums/:museumId/:expositionId/:artworkId', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single artwork', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const exposition = new Exposition({ _id: ObjectId(), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const artwork = new Work({ _id: ObjectId(), title: 'Grito', author: 'Munch', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          artwork.save((err, a) => {
            if (err) console.log(err)
            chai.request(server)
              .delete(`/museums/${mus.id}/${expo.id}/${a.id}`)
              .end((erro, res) => {
                if (erro) console.log(erro)
                res.should.have.status(200)
                done()
              })
          })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/PUT/museums/:museumId', () => {
    // eslint-disable-next-line no-undef
    it('should update a single museum', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const obj = {
        ca: 'Nova descripcio'
      }
      museum.save((e, mus) => {
        if (e) console.log(e)
        chai.request(server)
          .put(`/museums/${mus.id}`)
          .send(obj)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/PUT/museums/:museumId/:expositionId', () => {
    // eslint-disable-next-line no-undef
    it('should update a single exposition', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const exposition = new Exposition({ _id: ObjectId(), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const obj = {
        ca: 'Nova descripcio'
      }
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          chai.request(server)
            .put(`/museums/${mus.id}/${expo.id}`)
            .send(obj)
            .end((err, res) => {
              if (err) console.log(err)
              res.should.have.status(200)
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/PUT/museums/:museumId/:expositionId/:artworkId', () => {
    // eslint-disable-next-line no-undef
    it('should update a single exposition', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'MACBA', address: 'Pla??a Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', expositions: [], restrictions: [] })
      const exposition = new Exposition({ _id: ObjectId(), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, works: ['6048dd75eaf9c527ba4de26c'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const artwork = new Work({ _id: ObjectId(), title: 'Grito', author: 'Munch', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const obj = {
        ca: 'Nova descripcio'
      }
      museum.save((e, mus) => {
        if (e) console.log(e)
        exposition.save((er, expo) => {
          if (er) console.log(er)
          artwork.save((err, a) => {
            if (err) console.log(err)
            chai.request(server)
              .put(`/museums/${mus.id}/${expo.id}/${a.id}`)
              .send(obj)
              .end((erro, res) => {
                if (erro) console.log(erro)
                res.should.have.status(200)
                done()
              })
          })
        })
      })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Users', () => {
  // eslint-disable-next-line no-undef
  describe('/GET/users', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/users')
        .end((e, res) => {
          if (e) console.log(e)
          res.should.have.status(200)
          // eslint-disable-next-line no-unused-expressions
          res.should.to.be.json
          res.body.should.be.a('object')
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a user by the given id', (done) => {
      const user = new User({ _id: ObjectId('606c6f07e8f2bfb8ab667e6f'), userId: 'admin', email: 'test@test.com', name: 'Juan', bio: 'Me encanta Da Vinci', favourites: ['6048dd75eaf9c527ba4de26c'], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: ['6048d3d2eaf9c527ba4de26b'] })
      user.save((e, u) => {
        if (e) console.log(e)
        chai.request(server)
          .get('/users/' + u.email)
        //   .send(museum)
          .end((error, res) => {
            if (error) console.log(error)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('userId')
            res.body.user.should.have.property('points')
            res.body.user.should.have.property('favourites')
            res.body.user.should.have.property('bio')
            res.body.user.should.have.property('profilePic')
            res.body.user.should.have.property('premium')
            res.body.user.should.have.property('visited')
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/likes ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the liked artworks by the user', (done) => {
      const artwork = new Work({ _id: ObjectId(), title: 'Grito', author: 'Munch', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      artwork.save((e, a) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'user1', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: ['6048dd75eaf9c527ba4de26c'], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: ['6048d3d2eaf9c527ba4de26b'], likes: [a.id] })
        user.save((err, u) => {
          if (err) console.log(err)
          chai.request(server)
            .get('/users/' + u.userId + '/likes')
          //   .send(museum)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.likes.should.be.a('array')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/favourites ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the saved museums by the user', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'Picasso', address: 'Pablo Picasso', city: 'BCN', country: 'France', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: ['6048e3baeaf9c527ba4de26d'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, m) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'user2', name: 'Juan', bio: 'Me encanta Da Vinci', favourites: [m.id], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: ['6048d3d2eaf9c527ba4de26b'], likes: ['6048dd75eaf9c527ba4de26c'] })
        user.save((err, u) => {
          if (err) console.log(err)
          chai.request(server)
            .get('/users/' + u.userId + '/favourites')
          //   .send(museum)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.favourites.should.be.a('array')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/visited ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the visited museums by the user', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'testVisitedMuseum', address: 'testVisitedAddress', city: 'testVisitedCity', country: 'testVisitedCountry', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: [], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, m) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'testUser', name: 'testUser', bio: 'testBio', favourites: [m.id], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [m.id], likes: [] })
        user.save((err, u) => {
          if (err) console.log(err)
          chai.request(server)
            .get('/users/' + u.userId + '/visited')
          //   .send(users)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.visited.should.be.a('array')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new user', (done) => {
      const username = 'testUser2'
      const email = 'test2@email.com'
      chai.request(server)
        .post(`/users?username=${username}&email=${email}`)
        // .send({ username: username, email: email })
        .end((error, res) => {
          if (error) console.log(error)
          // console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.userId.should.be.a('string').equal(username)
          res.body.email.should.be.a('string').equal(email)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:username/likes', () => {
    // eslint-disable-next-line no-undef
    it('it should like an artwork', (done) => {
      const artwork = new Work({ _id: ObjectId(), title: 'Nova obra', author: 'Munch', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      artwork.save((e, a) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'Nou usuari', email: 'test@test.com', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
        user.save((err, u) => {
          if (err) console.log(err)
          const username = u.userId
          const artworkId = a.id
          chai.request(server)
            .post(`/users/${username}/likes?artwork=${artworkId}`)
            // .send({ username: username, email: email })
            .end((error, res) => {
              if (error) console.log(error)
              // console.log(res.body)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('name')
              res.body.should.have.property('userId')
              res.body.should.have.property('points')
              res.body.should.have.property('favourites')
              res.body.should.have.property('bio')
              res.body.should.have.property('profilePic')
              res.body.should.have.property('premium')
              res.body.should.have.property('visited')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:username/favourites', () => {
    // eslint-disable-next-line no-undef
    it('it should mark a museum as favourites', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'testVisitedMuseum', address: 'testVisitedAddress', city: 'testVisitedCity', country: 'testVisitedCountry', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: [], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, m) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'newUser', email: 'test@test.com', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
        user.save((err, u) => {
          if (err) console.log(err)
          const username = u.userId
          const museumId = m.id
          chai.request(server)
            .post(`/users/${username}/favourites?museum=${museumId}`)
            // .send({ username: username, email: email })
            .end((error, res) => {
              if (error) console.log(error)
              // console.log(res.body)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('name')
              res.body.should.have.property('userId')
              res.body.should.have.property('points')
              res.body.should.have.property('favourites')
              res.body.should.have.property('bio')
              res.body.should.have.property('profilePic')
              res.body.should.have.property('premium')
              res.body.should.have.property('visited')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:username/visited', () => {
    // eslint-disable-next-line no-undef
    it('it should mark a museum as visited', (done) => {
      const museum = new Museum({ _id: ObjectId(), name: 'testVisitedMuseum', address: 'testVisitedAddress', city: 'testVisitedCity', country: 'testVisitedCountry', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, expositions: [], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((e, m) => {
        if (e) console.log(e)
        const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
        user.save((err, u) => {
          if (err) console.log(err)
          const username = u.userId
          const museumId = m.id
          chai.request(server)
            .post(`/users/${username}/visited?museum=${museumId}`)
            // .send({ username: username, email: email })
            .end((error, res) => {
              if (error) console.log(error)
              // console.log(res.body)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('name')
              res.body.should.have.property('userId')
              res.body.should.have.property('points')
              res.body.should.have.property('favourites')
              res.body.should.have.property('bio')
              res.body.should.have.property('profilePic')
              res.body.should.have.property('premium')
              res.body.should.have.property('visited')
              done()
            })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:username/points', () => {
    // eslint-disable-next-line no-undef
    it('it should add points to a user', (done) => {
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
      user.save((err, u) => {
        if (err) console.log(err)
        const username = u.userId
        const points = 18
        const total = 25
        chai.request(server)
          .post(`/users/${username}/points?points=${points}&total=${total}`)
          // .send({ username: username, email: email })
          .end((error, res) => {
            if (error) console.log(error)
            // console.log(res.body)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('name')
            res.body.should.have.property('userId')
            res.body.should.have.property('points')
            res.body.should.have.property('favourites')
            res.body.should.have.property('bio')
            res.body.should.have.property('profilePic')
            res.body.should.have.property('premium')
            res.body.should.have.property('visited')
            done()
          })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/PUT/users/:username', () => {
    // eslint-disable-next-line no-undef
    it('should update a single user', (done) => {
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
      const obj = {
        name: 'full name',
        bio: 'changed bio'
      }
      user.save((e, us) => {
        if (e) console.log(e)
        chai.request(server)
          .put(`/users/${us.userId}`)
          .send(obj)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            done()
          })
      })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/PUT/users/:username/premium', () => {
    // eslint-disable-next-line no-undef
    it('should change the premium date from a user', (done) => {
      const newDate = new Date()
      const user = new User({ _id: ObjectId(), userId: 'newuser', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], premiumDate: newDate })
      user.save((e, us) => {
        if (e) console.log(e)
        chai.request(server)
          .put(`/users/${us.userId}/premium?days=5`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            done()
          })
      })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Quizzes', () => {
  // eslint-disable-next-line no-undef
  describe('/GET/quizzes', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the quizzes', (done) => {
      chai.request(server)
        .get('/quizzes')
        .end((e, res) => {
          if (e) console.log(e)
          res.should.have.status(200)
          // eslint-disable-next-line no-unused-expressions
          res.should.to.be.json
          res.body.should.be.a('object')
          done()
        })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/POST/quizzes', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new quizz', (done) => {
      const question = {
        ca: 'test catala',
        es: 'test castellano',
        en: 'test ingles'
      }
      const points = 1
      const answers = [
        {
          ca: '1503',
          es: '1503',
          en: '1503',
          correct: true
        },
        {
          ca: '1703',
          es: '1703',
          en: '1703',
          correct: false
        },
        {
          ca: '1553',
          es: '1553',
          en: '1553',
          correct: false
        },
        {
          ca: '1803',
          es: '1803',
          en: '1803',
          correct: false
        }
      ]
      const image = 'testUrl'
      chai.request(server)
        .post('/quizzes')
        .send({ quizz: { question: question, points: points, answers: answers, image: image } })
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.question.should.be.a('object')
          res.body.answers.should.be.a('array')
          res.body.points.should.be.a('number').equal(points)
          res.body.image.should.be.a('string').equal(image)
          res.body.question.ca.should.be.a('string').equal(question.ca)
          res.body.question.es.should.be.a('string').equal(question.es)
          res.body.question.en.should.be.a('string').equal(question.en)
          done()
        })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Comments', () => {
  // eslint-disable-next-line no-undef
  describe('/GET/comments?artworkId=:artworkId', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the comments from an artwork', (done) => {
      const artwork = new Work({ _id: ObjectId(), title: 'Gioconda', author: 'Leonardo da Vinci', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const comment = new Comment({ _id: ObjectId(), content: 'testComment', author: 'testUser', artwork: artwork.id, datetime: '2021-05-05T13:55:02.139+00:00', image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      artwork.save((e, work) => {
        if (e) console.log(e)
        comment.save((er, com) => {
          if (er) console.log(er)
          chai.request(server)
            .get(`/comments?artworkId=${work.id}`)
            .end((err, res) => {
              if (err) console.log(err)
              res.should.have.status(200)
              // eslint-disable-next-line no-unused-expressions
              res.should.to.be.json
              res.body.should.be.a('object')
              res.body.comments.should.be.a('array')
              res.body.comments[0].should.have.property('content')
              res.body.comments[0].should.have.property('author')
              res.body.comments[0].should.have.property('artwork')
              res.body.comments[0].should.have.property('datetime')
              res.body.comments[0].should.have.property('image')
              done()
            })
        })
      })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/POST/comments', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new comment', (done) => {
      const w = new Work({ _id: ObjectId(), title: 'obra', author: 'autor', score: 3.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
      w.save((e, work) => {
        if (e) console.log(e)
        user.save((er, u) => {
          if (er) console.log(er)
          const content = 'test'
          const author = u.userId
          const artwork = work.id
          chai.request(server)
            .post(`/comments?content=${content}&author=${author}&artworkId=${artwork}`)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              done()
            })
        })
      })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/DELETE/comments', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single comment', (done) => {
      const artwork = new Work({ _id: ObjectId(), title: 'Gioconda', author: 'Leonardo da Vinci', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const comment = new Comment({ _id: ObjectId(), content: 'testComment', author: 'testUser', artwork: artwork.id, datetime: '2021-05-05T13:55:02.139+00:00', image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      artwork.save((e, work) => {
        if (e) console.log(e)
        comment.save((er, com) => {
          if (er) console.log(er)
          chai.request(server)
            .delete(`/comments/${com.id}`)
            .end((err, res) => {
              if (err) console.log(err)
              res.should.have.status(200)
              done()
            })
        })
      })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Prizes', () => {
  // eslint-disable-next-line no-undef
  describe('/GET/prizes?user=username', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the prizes won by the user', (done) => {
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [] })
      user.save((e, u) => {
        if (e) console.log(e)
        chai.request(server)
          .get(`/prizes?user=${user.userId}`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            // eslint-disable-next-line no-unused-expressions
            res.should.to.be.json
            res.body.should.be.a('object')
            res.body.prizes.should.be.a('array')
            done()
          })
      })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Ratings', () => {
  // eslint-disable-next-line no-undef
  describe('/POST/ratings', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new rating', (done) => {
      const work = new Work({ _id: ObjectId(), title: 'obra', author: 'autor', score: 3.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      work.save((e, w) => {
        if (e) console.log(e)
        user.save((er, u) => {
          if (er) console.log(er)
          const score = 5
          const userId = u.userId
          const artwork = w.id
          chai.request(server)
            .post(`/ratings?user=${userId}&artwork=${artwork}&score=${score}`)
            .end((error, res) => {
              if (error) console.log(error)
              res.should.have.status(200)
              res.body.should.be.a('object')
              done()
            })
        })
      })
    })
  })
})

// eslint-disable-next-line no-undef
describe('Reports', () => {
  // eslint-disable-next-line no-undef
  describe('/POST/reports', () => {
    // eslint-disable-next-line no-undef
    it('it should create a new report', (done) => {
      const informant = new User({ _id: ObjectId(), userId: 'new1', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      const reported = new User({ _id: ObjectId(), userId: 'new2', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      const artwork = new Work({ _id: ObjectId(), title: 'Gioconda', author: 'Leonardo da Vinci', score: 9.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const comment = new Comment({ _id: ObjectId(), author: reported.userId, content: 'text', artwork: artwork.id })
      artwork.save((e, a) => {
        if (e) console.log(e)
        informant.save((er, i) => {
          if (er) console.log(er)
          reported.save((err, r) => {
            if (err) console.log(err)
            comment.save((erro, c) => {
              if (erro) console.log(erro)
              chai.request(server)
                .post(`/reports?informant=${i.userId}&comment=${c.id}`)
                .end((error, res) => {
                  if (error) console.log(error)
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
            })
          })
        })
      })
    })
  })
})
