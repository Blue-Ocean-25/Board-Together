var app = require('../index.js');
var request = require('supertest');
var expect = require('chai').expect;
// Will fail until we add checks for 404s
describe('Example', () => {
  it ('should return 404 for non-existent route', () => {
    return request(app)
      .get('/dfjdsfk')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text/)
      .expect(404)
      .then(err => {
        console.log(err)
      });
  });
});