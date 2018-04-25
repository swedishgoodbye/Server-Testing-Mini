// import { mongo } from 'mongoose';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = require('chai').expect;
const should = chai.should();

mongoose.connect('mongodb://localhost/test', {}, err => {
    if(err) return console.log(err);
});

const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            // assert that err should be type status etc.
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
      // check if its an array
      // check if 200
      // check body
      // check id
    });
  });

  describe('[POST] /api/bands', () => {
      it('should add a new band to the db', done => {
          chai
            .request(server)
            .post('/api/bands')
            .type('json')
            .send({
                '_method': 'put',
                'name': 'Dillinger Escape Plan',
                'genre': 'Mathcore'
            })
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                expect(response.status).to.equal(200);
                // console.log(response.body);
                console.log(response.body._id);
                return done();
            });
      });
  });
//   describe('[POST] /api/bands', () => {
//       it('should add a new band to the db', done => {
//           chai
//             .request(server)
//             .post('/api/bands')
//             .type('json')
//             .send({
//                 '_method': 'put',
//                 'name': 'Dillinger Escape Plan',
//                 'genre': 'Mathcore'
//             })

//             .delete('/band/' + response.body.id)
//             // .end((err, response) => {
//             //     if(err) {
//             //         console.log(err);
//             //         return done();
//             //     }
//             //     expect(response.status).to.equal(200);
//             //     console.log(response.body);
//             //     return done();
//             // });
//       });
//   });

// //   describe()

  describe('[DELETE] /api/band/:id', () => {
      it('should delete a band from the db', done => {
        let band = new Band({name: "The Dillinger Escape Plan", genre: "Mathcore"})
          band.save((err, band) => {
            chai.request(server)
            .delete('/band/' + band._id)
            // .end((err, res) => {
            //     res.should.have.status(200);
            //     done();
            // });
            done()
          })
      })
  })





