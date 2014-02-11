module.exports = new jsonToCSV();

// Example:
// var test = {name: "foo", age: 777}
// var j = new jsonToCSV.jsonToCSV(':', ';')
// j.convert([test], ["NAME", "AGE"])
// Note that the separator, lineEnd and field names -parameters can be left empty
//

function jsonToCSV() {

this.jsonToCSVInterface = {
  convert : function (jsonObjArray, fieldNames) {}
},

this.jsonToCSV = function (separator, lineEnd) {
  this.sep = separator || ',',
  this.endOfLine = lineEnd || ''
},

this.jsonToCSV.prototype = Object.create(this.jsonToCSVInterface),

this.jsonToCSV.prototype.convert = function (jsonObjArray, fieldNames) {
  var self = this;
  var result = '';

  if (typeof jsonObjArray === 'undefined') {
    return null;
  }
      
  result = self.buildFieldNames(jsonObjArray, fieldNames);
  result = result + self.endOfLine + "\n";

  jsonObjArray.forEach(function (jso) {
    result += self.objToCSVString(jso) + "\n";
  });
  return result;
},

this.jsonToCSV.prototype.buildFieldNames = function (jsonObjArray, fieldNames) {
  var self = this;
  var result = '';
  // Ensure that fieldNames -parameter is an array:
  fieldNames = Object.prototype.toString.call( fieldNames ) === '[object Array]' ? fieldNames : [];

  if (fieldNames && fieldNames.length > 0) {
    fieldNames.forEach(function (field) {
      result += "\"" + field + "\"" + self.sep;
    });
  } else {
    if (jsonObjArray.length > 0) {
      var firstObj = jsonObjArray[0];
      for (var fieldName in firstObj) {
        result = result + "\"" + fieldName + "\"" + self.sep;
      }
    }
  }
  result = result.slice(0,-(self.sep.length)); // take of the last separator
  return result;
},

this.jsonToCSV.prototype.objToCSVString = function (obj) {
  var self = this;
  var resultCSV = '';

  for (var fieldName in obj) {
    if (obj.hasOwnProperty(fieldName)) {

      if (typeof obj[fieldName] === 'string') {
        resultCSV += "\"" + obj[fieldName] + "\"" + self.sep;
      }

      else if (typeof obj[fieldName] === 'number') {
        resultCSV += obj[fieldName] + self.sep;
      }

      else if (Object.prototype.toString.call(obj[fieldName]) === '[object Date]') {
        resultCSV += "\"" + self.dateToString(obj[fieldName]) + "\"" + self.sep;
      }

      else if (Object.prototype.toString.call( obj[fieldName] ) === '[object Array]') {
        // flatten array to string:
        resultCSV += "\"" + obj[fieldName].toString() + "\"" + self.sep;
      }
          
      else if (obj[fieldName] === null) {
        resultCSV += '' + self.sep;
      }

      else {
        resultCSV += '' + self.sep;
      }
    }
  }
  return resultCSV.slice(0,-(self.sep.length)) + self.endOfLine;
},

this.jsonToCSV.prototype.dateToString = function (date) {
  var self = this;
  var result = "";
  if (typeof date !== 'undefined' && date !== null) {
    result = date.getFullYear().toString() + '-' +
             self.prefixStringNDigitsLong( (date.getMonth() + 1).toString(), '0', 2) + "-" +
             self.prefixStringNDigitsLong( date.getDate().toString(), '0', 2);
  }
  return result;
},

this.jsonToCSV.prototype.prefixStringNDigitsLong = function (str, prefixChar, n) {
  var mask = new Array(n + 1);
  mask = mask.join(prefixChar);
  return (mask + str.toString()).slice(-n);
}

}
