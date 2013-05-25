//
// Run with: "mocha --reporter spec", or just "mocha"
//   Other reporters e.g. json, nyan, tap, list
// For documentation visit: http://visionmedia.github.io/mocha/

var assert = require("assert")
  , j2csv = require("../json2csv")

describe('j2csv', function(){
  describe('convert', function(){

    it('should not crash when jsonObj is empty', function(){
      var j = new j2csv.jsonToCSV()
        , test = {name: 'foo', age: 10}
        , toTest = j.convert()
      assert.equal(undefined, toTest)
    })
    
    it('should convert test correctly', function(){
      var j = new j2csv.jsonToCSV()
        , test = {name: 'foo', age: 10}
        , toTest = j.convert([test])
      assert.equal("\"name\",\"age\"\n\"foo\",10\n", toTest)
    })
  })
})
