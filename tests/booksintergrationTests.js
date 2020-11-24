require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crus Test', () => {
  it('should allow a bok to be posted and return read and _it', (done) => {
    const bookPost = { title: 'My Book', author: 'Aviv', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        //results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(async (done) => {
    Book.deleteMany({}).exec();
    mongoose.connection.close(done());
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
