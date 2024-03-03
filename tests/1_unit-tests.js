const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  // test whole number input
  test('Whole number input', function() {
    assert.strictEqual(convertHandler.getNum('10kg'), 10);
  });

  // test decimal number input
  test('Decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('5.5kg'), 5.5);
  });

  // test fractional input
  test('Fractional input with a decimal', function() {
    assert.strictEqual(convertHandler.getNum('1.5/2kg'), 0.75);
  });

  // test double-fraction input
  test('Double-fraction input', function () {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  // test default numerical input of 1
  test('Default numerical input of 1', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  // test reading each valid input unit
  test('Read each valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('10kg'), 'kg');
    assert.strictEqual(convertHandler.getUnit('5.5lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('1/2gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('1.5/2mi'), 'mi');
  });

  // test error for an invalid input unit
  test('Error for an invalid input unit', function () {
    assert.strictEqual(convertHandler.getUnit('10foo'), 'invalid unit');
  });

  // test correct return unit for each valid input unit
  test('Correct return unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'l');
    assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
  });

  // test spelled-out string unit for each valid input unit
  test('Spelled-out string unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
  });

  // test conversion from gal to L
  test('Convert gal to L', function() {
    assert.approximately(convertHandler.convert(1,'gal'), 3.78541, 0.1);
  });

  // test conversion from L to gal
  test('Convert L to gal', function() {
    assert.approximately(convertHandler.convert(1,'l'), 0.26417, 0.1);
  });

  // test conversion from mi to km
  test('Convert mi to km', function() {
    assert.approximately(convertHandler.convert(1,'mi'), 1.60934, 0.1);
  });

  // test conversion from km to mi
  test('Convert km to mi', function() {
    assert.approximately(convertHandler.convert(1,'km'), 0.62137, 0.1);
  });

  // test conversion from lbs to kg
  test('Convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1,'lbs'), 0.45359, 0.1)
  });

  // test conversion from kg to lbs
  test('Convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1,'kg'), 2.20462, 0.1);
  });

});
