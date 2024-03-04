'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;

      // Extract the number and unit from the input
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      // Check for invalid input
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.status(400).json({ error: 'invalid number and unit' });
      }
      if (initNum === 'invalid number') {
        return res.status(400).json({ error: 'invalid number' });
      }
      if (initUnit === 'invalid unit') {
        return res.status(400).json({ error: 'invalid unit' });
      }

      // Perform the conversion
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Send the response
      res.json({ initNum, initUnit, returnNum, returnUnit, string });
    });

};
