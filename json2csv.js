/**
 * A tiny utility to convert the Json-format into CSV-representation.
 * (C) 2013 Tuomas Palenius. MIT-license.
 * 
 * Usage Example:
 *   var test = {name: "foo", age: 777}
 *   var j = new JsonToCSV.jsonToCSV(":", ";")
 *   j.convert([test], ["NAME", "AGE"])
 *
 * Note that the separator, lineEnd and field names -parameters can be left empty
 */
(function () {
  "use strict";

  function JsonToCSV() {

    this.jsonToCSVInterface = {
      /** Converts the Json-obj into a comma separated output.
        * @param {array} jsonObjArray - Array of Json that will be converted.
        * @param {array} fieldNames - Optional. Array of string to tell what the headers for
        *   csv-fields should be. If left empty the key names from Json objects will be used.
        * @returns {string} - the resulting csv-representation.
        */
      convert: function (jsonObjArray, fieldNames) {}
    };

    /**
     * Constructor.
     * @param {string} separator - Optional. The separator character between csv-fields
     * @param {string} lineEnd - Optional. The last character for each line
     */
    this.jsonToCSV = function (separator, lineEnd) {
      this.sep = separator || ",";
      this.endOfLine = lineEnd || "";
    };

    this.jsonToCSV.prototype = Object.create(this.jsonToCSVInterface);

    this.jsonToCSV.prototype.convert = function (jsonObjArray, fieldNames) {
      var self, result;
      self = this;
      result = "";

      if (typeof jsonObjArray === "undefined") {
        return null;
      }

      result = self.buildFieldNames(jsonObjArray, fieldNames);
      result = result + self.endOfLine + "\n";

      jsonObjArray.forEach(function (jso) {
        result += self.objToCSVString(jso) + "\n";
      });
      return result;
    };

    this.jsonToCSV.prototype.buildFieldNames = function (jsonObjArray, fieldNames) {
      var self, result, firstObj, fieldName;
      self = this;
      result = "";
      // Ensure that fieldNames -parameter is an array:
      fieldNames = Object.prototype.toString.call(fieldNames) === "[object Array]" ? fieldNames : [];

      if (fieldNames && fieldNames.length > 0) {
        fieldNames.forEach(function (field) {
          result += "\"" + field + "\"" + self.sep;
        });
      } else {
        if (jsonObjArray.length > 0) {
          firstObj = jsonObjArray[0];
          for (fieldName in firstObj) {
            if (firstObj.hasOwnProperty(fieldName)) {
              result = result + "\"" + fieldName + "\"" + self.sep;
            }
          }
        }
      }
      result = result.slice(0, -(self.sep.length)); // take of the last separator
      return result;
    };

    this.jsonToCSV.prototype.objToCSVString = function (obj) {
      var self, resultCSV, fieldName;
      self = this;
      resultCSV = "";

      for (fieldName in obj) {
        if (obj.hasOwnProperty(fieldName)) {
          if (typeof obj[fieldName] === "string") {
            resultCSV += "\"" + obj[fieldName] + "\"" + self.sep;
          } else if (typeof obj[fieldName] === "number") {
            resultCSV += obj[fieldName] + self.sep;
          } else if (Object.prototype.toString.call(obj[fieldName]) === "[object Date]") {
            resultCSV += "\"" + self.dateToString(obj[fieldName]) + "\"" + self.sep;
          } else if (Object.prototype.toString.call(obj[fieldName]) === "[object Array]") {
            // flatten array to string:
            resultCSV += "\"" + obj[fieldName].toString() + "\"" + self.sep;
          } else if (obj[fieldName] === null) {
            resultCSV += self.sep;
          } else {
            resultCSV += self.sep;
          }
        }
      }
      return resultCSV.slice(0, -(self.sep.length)) + self.endOfLine;
    };

    this.jsonToCSV.prototype.dateToString = function (date) {
      var self, result;
      self = this;
      result = "";
      if (typeof date !== "undefined" && date !== null) {
        result = date.getFullYear().toString() + '-' +
                 self.prefixStringNDigitsLong((date.getMonth() + 1).toString(), "0", 2) + "-" +
                 self.prefixStringNDigitsLong(date.getDate().toString(), "0", 2);
      }
      return result;
    };

    this.jsonToCSV.prototype.prefixStringNDigitsLong = function (str, prefixChar, n) {
      var mask = new Array(n + 1);
      mask = mask.join(prefixChar);
      return (mask + str.toString()).slice(-n);
    };

  }
  module.exports = new JsonToCSV();
}());
