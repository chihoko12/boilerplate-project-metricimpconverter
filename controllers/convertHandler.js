function ConvertHandler() {

  this.getNum = function(input) {
    // Extract the numerical part from the input string
    // const regex = /^[0-9]+(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)?/;
    const regex = /^[^\d\.\/]*([\d\.\/]+)/;
    let regexMatch = input.match(regex);

    // default to 1 if no numeric part is found
    if (!regexMatch) return 1;

    const numStr = regexMatch[1];
    // check for double-fraction
    if (numStr.split('/').length > 2) {
      // invalid input if more than one slash
      return 'invalid number';
    }

    try {
      // evaluate the numeric part safely
      const result = eval(numStr);
      if (typeof result === 'number' && !isNaN(result)) {
        return result;
      }
      // return null if evaluation fails or is NaN
      return 'invalid number';
    } catch (e) {
      // return null if eval throws an error (e.g. invalid fraction)
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    // Extract the unit part from the input string
    const regex = /[a-zA-Z]+$/;
    // First, find the index where the unit begins
    const unitIndex = input.search(/[a-zA-Z]/);
    // if no unit is found, return 'invalid unit'
    if (unitIndex === -1) return 'invalid unit';

    // extract everything from the unit's starting index to the end of the string
    const unit = input.substring(unitIndex).toLowerCase().trim();
    const validUnits = ['gal','l','lbs','kg','mi','km']
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    // if the extracted unit is not in the list of valid units, return 'invalid unit'
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    // define the return units based on the initial unit
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg':'lbs',
      'mi':'km',
      'km':'mi'
    };
    let result = unitMap[initUnit];

    return result;
  };

  this.spellOutUnit = function(unit) {
    // define full names of units
    const unitNames = {
      'gal': 'gallons',
      'L':'liters',
      'lbs':'pounds',
      'kg':'kilograms',
      'mi':'miles',
      'km':'kilometers'
    };
    let result = unitNames[unit];

    return result;
  };

  this.convert = function(initNum, initUnit) {
    // define conversion factors
    const conversions = {
      'gal': 3.78541,
      'L': 1/3.78541,
      'lbs': 0.453592,
      'kg': 1/0.453592,
      'mi': 1.60934,
      'km': 1/1.60934
    }

    let result = initNum * conversions[initUnit];
    return parseFloat(result.toFixed(5));

  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // construct the result string
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
