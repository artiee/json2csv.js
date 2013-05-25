  // Example:
  //   var test = {name: "foo", age: 777}
  // var j = new jsonToCSV(':', ';')
  // j.convert([test], ["NAME", "AGE"])
  // Note that the separator, lineEnd and field names -parameters can be left empty
  //
  var jsonToCSV = function (separator, lineEnd) {

    this.sep = ",",

    this.endOfLine = "",

    this.convert = function(jsonObjArray, fieldNames){
      var self = this
        , result = ""

      if (typeof separator !== 'undefined')
        this.sep = separator

      if (typeof lineEnd !== 'undefined')
        this.endOfLine = lineEnd
      
      result = self.buildFieldNames(jsonObjArray, fieldNames)
      result = result + self.endOfLine + "\n"

      jsonObjArray.forEach(function(jso){
        result += self.objToCSVString(jso) + "\n"
      })
      return result
    },

    this.buildFieldNames = function(jsonObjArray, fieldNames){
      var self = this
        , result = ""

      if (typeof fieldNames !== 'undefined') {
        fieldNames.forEach(function(field){
          result += "\"" + field + "\"" + self.sep
        })
      } else {
        if (jsonObjArray.length > 0) {
          var firstObj = jsonObjArray[0]
          for (var fieldName in firstObj) {
            result = result + "\"" + fieldName + "\"" + self.sep
          }
        }
      }
      result = result.slice(0,-1) // take of the last comma
      return result
    },

    this.objToCSVString = function (obj) {
      var self = this
        , resultCSV = ''

      for (var fieldName in obj) {
        if (obj.hasOwnProperty(fieldName)) {

          if (typeof obj[fieldName] === 'string')
            resultCSV += "\"" + obj[fieldName] + "\"" + self.sep

          else if (typeof obj[fieldName] === 'number')
            resultCSV += obj[fieldName] + self.sep

          else if (Object.prototype.toString.call( obj[fieldName] ) === '[object Array]') {
            // flatten array to string:
            resultCSV += "\"" + obj[fieldName].toString() + "\"" + self.sep
          }
          
          else if (obj[fieldName] === null)
            resultCSV += '' + self.sep

          else
            resultCSV += '' + self.sep
        }
      }
      return resultCSV.slice(0,-1) + self.endOfLine
    }

  }
