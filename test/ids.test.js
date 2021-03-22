process.env.MODE = 'test'

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Museum = require('../models/museum')
const Exposition = require('../models/exposition')
const Work = require('../models/artwork')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('Museums', () => {
  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    Museum.deleteMany({}, (err) => {
      if (err) console.log(err)
      Exposition.deleteMany({}, (err) => {
        if (err) console.log(err)
        done()
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET museum', () => {
    // eslint-disable-next-line no-undef
    it('it should GET all the museums', (done) => {
      chai.request(server)
        .get('/museums')
        .end((err, res) => {
          if (err) console.log(err)
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
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26a'), name: 'MACBA', address: 'Plaça Skaters', city: 'Barcelona', country: 'Spain', image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((err, mus) => {
        if (err) console.log(err)
        chai.request(server)
          .get('/museums/' + mus.id)
        //   .send(museum)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.museum.should.have.property('name')
            res.body.museum.should.have.property('address')
            res.body.museum.should.have.property('city')
            res.body.museum.should.have.property('country')
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
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26b'), name: 'Orsay', address: 'Rue Orsay', city: 'Paris', country: 'France', expositions: ['6048e3baeaf9c527ba4de26d'], image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const exposition = new Exposition({ _id: ObjectId('6048e3baeaf9c527ba4de26b'), name: 'Main Expo', room: 'Main Hall', descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      museum.save((err, mus) => {
        if (err) console.log(err)
        exposition.save((err, expo) => {
          if (err) console.log(err)
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
              res.body.exposition.should.have.property('image')
              res.body.exposition.should.have.property('_id').eql(expo.id)
              done()
            })
        })
      })
    })
  })
})
