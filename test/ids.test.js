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
      done()
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
  describe('/GET/:id museum', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a museum by the given id', (done) => {
      const museum = new Museum({ _id: ObjectId('6048d3d2eaf9c527ba4de26b'), name: 'MACBA', address: 'Plaça Skaters', city: 'Barcelona', country: 'Spain' })
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
            res.body.museum.should.have.property('_id').eql(museum.id)
            done()
          })
      })
    })
  })
})
