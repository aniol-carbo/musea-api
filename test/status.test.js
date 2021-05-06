process.env.MODE = 'test'

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Museum = require('../models/museum')
const Exposition = require('../models/exposition')
const Work = require('../models/artwork')
const User = require('../models/user')
const Quizz = require('../models/quizz')
const Comment = require('../models/comment')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('Error cases:', () => {
  // eslint-disable-next-line no-undef
  describe('Museums:', () => {
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
                Comment.deleteMany({}, (errorr) => {
                  if (errorr) console.log(errorr)
                  done()
                })
              })
            })
          })
        })
      })
    })

    // eslint-disable-next-line no-undef
    describe('/GET/:museumId', () => {
      // eslint-disable-next-line no-undef
      it('it should check there is no museum with an invalid id', (done) => {
        chai.request(server)
          .get('/museums/6048d3d2eaf9c527ba4de26a')
        //   .send(museum)
          .end((er, res) => {
            if (er) console.log(er)
            res.should.have.status(404)
            done()
          })
      })
    })
  })
})
