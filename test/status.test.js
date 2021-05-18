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
                Comment.deleteMany({}, (error2) => {
                  if (error2) console.log(error2)
                  Rating.deleteMany({}, (error3) => {
                    if (error3) console.log(error3)
                    Report.deleteMany({}, (error4) => {
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

// eslint-disable-next-line no-undef
describe('Ratings', () => {
  // eslint-disable-next-line no-undef
  describe('/POST/ratings', () => {
    // eslint-disable-next-line no-undef
    it('it should fail when creating an existing rating', (done) => {
      const work = new Work({ _id: ObjectId(), title: 'obra', author: 'autor', score: 3.8, descriptions: { ca: 'Catala', es: 'Castellano', en: 'English' }, image: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg' })
      const user = new User({ _id: ObjectId(), userId: 'Nou usuari', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      const rating = new Rating({ _id: ObjectId(), user: user.userId, artwork: work.id, score: 5, date: new Date() })
      work.save((e, w) => {
        if (e) console.log(e)
        user.save((er, u) => {
          if (er) console.log(er)
          rating.save((err, r) => {
            if (err) console.log(err)
            const score = 5
            const user = u.userId
            const artwork = w.id
            chai.request(server)
              .post(`/ratings?user=${user}&artwork=${artwork}&score=${score}`)
              .end((error, res) => {
                if (error) console.log(error)
                res.should.have.status(401)
                done()
              })
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
    it('it should fail when creating an existing report', (done) => {
      const user = new User({ _id: ObjectId(), userId: 'new1', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      const user2 = new User({ _id: ObjectId(), userId: 'new2', name: 'Jose', email: 'test@test.com', bio: 'Me encanta Da Vinci', favourites: [], points: 21, profilePic: 'https://cronicaglobal.elespanol.com/uploads/s1/46/47/88/5/macba.jpeg', premium: true, visited: [], likes: [], totalBans: 0, totalReports: 0 })
      const comment = new Comment({ _id: ObjectId(), author: user.userId, content: 'text' })
      const report = new Report({ _id: ObjectId(), informant: user.userId, reported: user2.userId, comment: comment.id, date: new Date() })
      comment.save((e, c) => {
        if (e) console.log(e)
        user.save((er, u) => {
          if (er) console.log(er)
          report.save((err, r) => {
            if (err) console.log(err)
            const user = u.userId
            const commentId = c.id
            chai.request(server)
              .post(`/reports?informant=${user}&comment=${commentId}`)
              .end((error, res) => {
                if (error) console.log(error)
                res.should.have.status(404)
                done()
              })
          })
        })
      })
    })
  })
})
