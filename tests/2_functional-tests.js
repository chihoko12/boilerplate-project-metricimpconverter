const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // test conversion with a valid input
  test('Convert valid input (e.g.,10L', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err,res) {
        assert.equal(res.status,200);
        assert.equal(res.body.initNum,10);
        assert.equal(res.body.initUnit,'L');
        assert.approximately(res.body.returnNum, 2.64172,0.1);
        assert.equal(res.body.returnUnit,'gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        done();
      });
  });

  // test conversion with an invalid input
  test('Convert invalid input (e.g., 32g', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err,res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  // test conversion with an invalid number
  test('Convert invalid number (e.g., 3/7.2/4kg)', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg '})
      .end(function(err,res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  // test conversion with an invalid number and unit
  test('Convert invalid number and unit (e.g., 3/7.2/4kilomegagram',  function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  // test conversion with no number
  test('Convert with no number (e.g., kg', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1)
        assert.equal(res.body.initUnit, 'kg')
        assert.approximately(res.body.returnNum, 2.20462,0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });
});
