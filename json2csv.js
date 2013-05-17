  // Example:
  //   var test = {name: "foo", age: 777}
  //   jsonToCSV([test], ["NAME", "AGE"])
  // Note that the field names -parameter can be left empty
  //
  function jsonToCSV (jsonObjArray, fieldNames) {
    var result = ""

    // build fieldnames:
    if (typeof fieldNames !== 'undefined') {
      fieldNames.forEach(function(field){
        result += "\"" + field + "\","
      })
    } else {
      if (jsonObjArray.length > 0) {
        var firstObj = jsonObjArray[0]
        for (var fieldName in firstObj) {
          result = result + "\"" + fieldName + "\","
        }
      }
    }

    result = result.slice(0,-1) // take of the last comma
    result = result + ";\n"

    jsonObjArray.forEach(function(jso){
      result += objToCSVString(jso) + "\n"
    })

    function objToCSVString (obj) {
      var resultCSV = ''
      for (var fieldName in obj) {
        if (obj.hasOwnProperty(fieldName)) {

          if (typeof obj[fieldName] === 'string')
            resultCSV += "\"" + obj[fieldName] + "\","

          else if (typeof obj[fieldName] === 'number')
            resultCSV += obj[fieldName] + ","

          else if (Object.prototype.toString.call( obj[fieldName] ) === '[object Array]') {
            // flatten array to string:
            resultCSV += "\"" + obj[fieldName].toString() + "\","
          }
        }
      }
      return resultCSV.slice(0,-1) + ";"
    }

    return result

  }
