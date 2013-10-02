module.exports = jsonToCSV

  // Example:
  //   var test = {name: "foo", age: 777}
  // var j = new jsonToCSV(':', ';')
  // j.convert([test], ["NAME", "AGE"])
  // Note that the separator, lineEnd and field names -parameters can be left empty
  //
function jsonToCSV(separator, lineEnd) {

  this.sep = ',',

  this.endOfLine = '',

  this.convert = function(jsonObjArray, fieldNames){
    const self = this
    var result = ''

    if (typeof jsonObjArray === 'undefined') {
      return null
    }

    if (typeof separator !== 'undefined') {
      this.sep = separator
    }

    if (typeof lineEnd !== 'undefined') {
      this.endOfLine = lineEnd
    }
      
    result = self.buildFieldNames(jsonObjArray, fieldNames)
    result = result + self.endOfLine + "\n"

    jsonObjArray.forEach(function(jso) {
      result += self.objToCSVString(jso) + "\n"
    })
    return result
  },

  this.buildFieldNames = function(jsonObjArray, fieldNames){
    const self = this
    var result = ''
    // Ensure that fieldNames -parameter is an array:
    fieldNames = Object.prototype.toString.call( fieldNames ) === '[object Array]' ? fieldNames : []

    if (fieldNames && fieldNames.length > 0) {
      fieldNames.forEach(function(field) {
        result += "\"" + field + "\"" + self.sep
      })
    } else {
      if (jsonObjArray.length > 0) {
        const firstObj = jsonObjArray[0]
        for (var fieldName in firstObj) {
          result = result + "\"" + fieldName + "\"" + self.sep
        }
      }
    }
    result = result.slice(0,-(self.sep.length)) // take of the last separator
    return result
  },

  this.objToCSVString = function (obj) {
    const self = this
    var resultCSV = ''

    for (var fieldName in obj) {
      if (obj.hasOwnProperty(fieldName)) {

        if (typeof obj[fieldName] === 'string') {
          resultCSV += "\"" + obj[fieldName] + "\"" + self.sep
        }

        else if (typeof obj[fieldName] === 'number') {
          resultCSV += obj[fieldName] + self.sep
        }

        else if (Object.prototype.toString.call( obj[fieldName] ) === '[object Array]') {
          // flatten array to string:
          resultCSV += "\"" + obj[fieldName].toString() + "\"" + self.sep
        }
          
        else if (obj[fieldName] === null) {
          resultCSV += '' + self.sep
        }

        else {
          resultCSV += '' + self.sep
        }
      }
    }
    return resultCSV.slice(0,-(self.sep.length)) + self.endOfLine
  }

}
