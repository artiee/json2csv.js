  // Example:
  //   var test = {name: "foo", age: 777}
  //   jsonToCSV([test], ",", "", ["NAME", "AGE"])
  // Note that the separator, lineEnd and field names -parameters can be left empty
  //
  function jsonToCSV (jsonObjArray, separator, lineEnd, fieldNames) {
    var result = ""
      , sep = ","
      , endOfLine = ""

    if (typeof separator !== 'undefined')
      sep = separator

    if (typeof lineEnd !== 'undefined')
      endOfLine = lineEnd

    // build fieldnames:
    if (typeof fieldNames !== 'undefined') {
      fieldNames.forEach(function(field){
        result += "\"" + field + "\"" + sep
      })
    } else {
      if (jsonObjArray.length > 0) {
        var firstObj = jsonObjArray[0]
        for (var fieldName in firstObj) {
          result = result + "\"" + fieldName + "\"" + sep
        }
      }
    }

    result = result.slice(0,-1) // take of the last comma
    result = result + endOfLine + "\n"

    jsonObjArray.forEach(function(jso){
      result += objToCSVString(jso) + "\n"
    })

    function objToCSVString (obj) {
      var resultCSV = ''
      for (var fieldName in obj) {
        if (obj.hasOwnProperty(fieldName)) {

          if (typeof obj[fieldName] === 'string')
            resultCSV += "\"" + obj[fieldName] + "\"" + sep

          else if (typeof obj[fieldName] === 'number')
            resultCSV += obj[fieldName] + sep

          else if (Object.prototype.toString.call( obj[fieldName] ) === '[object Array]') {
            // flatten array to string:
            resultCSV += "\"" + obj[fieldName].toString() + "\"" + sep
          }
        }
      }
      return resultCSV.slice(0,-1) + endOfLine
    }

    return result

  }
