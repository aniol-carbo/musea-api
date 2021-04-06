process.env.MODE = 'test'

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Museum = require('../models/museum')
const Exposition = require('../models/exposition')
const Work = require('../models/artwork')
const User = require('../models/user')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// const artwork = require('../models/artwork')
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
            done()
          })
        })
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET museum', () => {
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
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/:museumId', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a museum by the given id', (done) => {
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26a'), name: 'MACBA', address: 'Plaça Skaters', city: 'Barcelona', country: 'Spain', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
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
  describe('/GET/users/:userId ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a user by the given id', (done) => {
      const user = new User({ _id: ObjectId('606c6f07e8f2bfb8ab667e6f'), userId: 'admin', name: 'Juan', bio: 'Me encanta Da Vinci', favourites: ['6048dd75eaf9c527ba4de26c'], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: ['6048d3d2eaf9c527ba4de26b'] })
      user.save((e, u) => {
        if (e) console.log(e)
        chai.request(server)
          .get('/users/' + u.userId)
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
})
