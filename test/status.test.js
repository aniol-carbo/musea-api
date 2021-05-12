process.env.MODE = 'test'

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
    describe('/GET/museums/:museumId', () => {
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
    // eslint-disable-next-line no-undef
    describe('/DELETE/museums/:museumId', () => {
      // eslint-disable-next-line no-undef
      it('it should DELETE a museum identified by museumid', (done) => {
        chai.request(server)
          .delete('/museums/6048d3faeaf9c527ba4de26a')
          .end((er, res) => {
            if (er) console.log(er)
            res.should.have.status(404)
            done()
          })
      })
    })
    // eslint-disable-next-line no-undef
    describe('/PUT/museums/:museumId', () => {
      // eslint-disable-next-line no-undef
      it('it should edit a museum´s info with museumid', (done) => {
        chai.request(server)
          .put('/museums/6048d3d2eaf9c527ba4de26a?ca=test&es=test&en=test&image=testImage')
          .end((er, res) => {
            if (er) console.log(er)
            res.should.have.status(404)
            done()
          })
      })
    })
    // eslint-disable-next-line no-undef
    describe('/GET/museums/:museumId/:expositionId ', () => {
      // eslint-disable-next-line no-undef
      it('it should GET an exposition by the given id', (done) => {
        chai.request(server)
          .get('/museums/6048d3d2eaf9c527ba4de26a/6048d3d2eaf9c527ba4de26a')
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(404)
            done()
          })
      })
    })
    // eslint-disable-next-line no-undef
    describe('/PUT/museums/:museumId/:expositionId', () => {
      // eslint-disable-next-line no-undef
      it('it should edit an expo´s info from a museum with museumid', (done) => {
        chai.request(server)
          .put('/museums/6048d3d2eaf9c527ba4de26a/6048d3d2eaf9c527ba4de26a?room=test&ca=test&es=test&en=test&image=testImage')
          .end((er, res) => {
            if (er) console.log(er)
            res.should.have.status(404)
            done()
          })
      })
    })
    // eslint-disable-next-line no-undef
    describe('/DELETE/museums/:museumId/:expositionId', () => {
      // eslint-disable-next-line no-undef
      it('should delete a single exposition from a museum', (done) => {
        chai.request(server)
          .delete('/museums/6048d3d2eaf9c427ba4de26a/6048d3d2eaf9c427ba4de26a')
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(404)
            done()
          })
      })
    })
    // eslint-disable-next-line no-undef
    describe('/GET/:museumId/:expositionId/:artworkId ', () => {
      // eslint-disable-next-line no-undef
      it('it should GET an artwork by the given id', (done) => {
        chai.request(server)
          .get('/museums/6048d3d2eaf9c527ba4de26a/6048d3d2eaf9c527ba4de26a6048d3d2eaf9c527ba4de26a')
          .end((error, res) => {
            if (error) console.log(error)
            res.should.have.status(404)
            done()
          })
      })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/PUT/museums/:museumId/:expositionId/:artworkId', () => {
    // eslint-disable-next-line no-undef
    it('it should edit an artwork´s info from an exposition with expositionId', (done) => {
      chai.request(server)
        .put('/museums/6048d3d2eaf9c527ba4de26a/6048d3d2eaf9c527ba4de26a/6048d3d2eaf9c527ba4de26a?type=test&room=test&ca=test&es=test&en=test&image=testImage&score=1')
        .end((er, res) => {
          if (er) console.log(er)
          res.should.have.status(404)
          done()
        })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/DELETE/museums/:museumId/:expositionId/:artworkId', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single artwork from an exposition', (done) => {
      chai.request(server)
        .delete('/museums/6048d3d2eaf9c427ba4de26a/6048d3d2eaf9c427ba4de26a/6048d3d2eaf9c427ba4de26a')
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(404)
          done()
        })
    })
  })
})
// eslint-disable-next-line no-undef
describe('Users', () => {
  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET a user by the given id', (done) => {
      chai.request(server)
        .get('/users/6048d3d2eaf9c527ba4de26a')
      //   .send(museum)
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/PUT/users/:userId ', () => {
    // eslint-disable-next-line no-undef
    it('it should edit a user with the given id', (done) => {
      chai.request(server)
        .put('/users/6048d3d2eaf9c527ba4de26a?name=testName&bio=testBio')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/likes ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the liked artworks by the user', (done) => {
      chai.request(server)
        .get('/users/tets/likes')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/favourites ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the favourite artworks from the user', (done) => {
      chai.request(server)
        .get('/users/tets/favourites')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/GET/users/:userId/visited ', () => {
    // eslint-disable-next-line no-undef
    it('it should GET the visited artworks by the user', (done) => {
      chai.request(server)
        .get('/users/tets/visited')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:userId/likes ', () => {
    // eslint-disable-next-line no-undef
    it('it should add a liked artwork to the user', (done) => {
      chai.request(server)
        .get('/users/tets/likes?artwork=6048d3d2eaf9c527ba4de26a')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:userId/favourites ', () => {
    // eslint-disable-next-line no-undef
    it('it should add a favourite museum to the user', (done) => {
      chai.request(server)
        .get('/users/tets/favourites?museum=6048d3d2eaf9c527ba4de26a')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:userId/visited ', () => {
    // eslint-disable-next-line no-undef
    it('it should add a visited museum to the user', (done) => {
      chai.request(server)
        .get('/users/tets/visited?museum=6048d3d2eaf9c527ba4de26a')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
          done()
        })
    })
  })

  // eslint-disable-next-line no-undef
  describe('/POST/users/:userId/points ', () => {
    // eslint-disable-next-line no-undef
    it('it should update the points from the given user', (done) => {
      chai.request(server)
        .get('/users/tets/visited?points=4')
        .end((error, res) => {
          if (error) console.log(error)
          res.should.have.status(404)
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
    it('it should GET all comments of the given artwork id', (done) => {
      chai.request(server)
        .get('/comments?artworkId=7048d3d2eaf3d527ba4de26a')
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(404)
          done()
        })
    })
  })
  // eslint-disable-next-line no-undef
  describe('/DELETE/comments/:commentId', () => {
    // eslint-disable-next-line no-undef
    it('should delete a single comment', (done) => {
      chai.request(server)
        .delete('/comments/6048d3d2eaf9c427ba4de26a')
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(404)
          done()
        })
    })
  })
})
