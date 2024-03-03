function ConvertHandler() {

  this.getNum = function(input) {
    // Extract the numerical part from the input string
    const regex = /^[0-9]+(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)?/;
    let result = input.match(regex);

    // if result is null or empty, default to 1
    return result ? eval(result[0]) : 1;
  };

  this.getUnit = function(input) {
    // Extract the unit part from the input string
    const regex = /[a-zA-Z]+$/;
    let result = input.match(regex);

    if (!result) return null;

    // normalize units to lowercase
    return result[0].toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    // define the return units based on the initial unit
    const unitMap = {
      'gal': 'l',
      'l': 'gal',
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
      'l':'liters',
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
      'l': 1/3.78541,
      'lbs': 0.453592,
      'kg': 1/0.453592,
      'mi': 1.60934,
      'km': 1/1.60934
    }

    return initNum * conversions[initUnit];

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    // switch (initUnit) {
    //   case 'gal':
    //     result = initNum * galToL;
    //     break;
    //   case 'l':
    //     result = initNum / galToL;
    //     break;
    //   case 'lbs':
    //     result = initNum * lbsToKg;
    //     break;
    //   case 'kg':
    //     result = initNum / lbsToKg;
    //     break;
    //   case 'mi':
    //     result = initNum * miToKm;
    //     break;
    //   case 'km':
    //     result = initNum / miToKm;
    //     break;
    //   default:
    //     result = null;
    // }
    // return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // construct the result string
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
