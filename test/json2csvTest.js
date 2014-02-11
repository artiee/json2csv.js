//
// Run with: "mocha --reporter spec", or just "mocha"
//   Other reporters e.g. json, nyan, tap, list
// For documentation visit: http://visionmedia.github.io/mocha/

var assert = require("assert")
  , j2csv = require("../lib/jsonToCSV");

describe ('j2csv', function() {

  describe ('convert', function() {

    it ('should not crash when jsonObj is empty', function(){
      var j = new j2csv.jsonToCSV()
	    , test = {name: 'foo', age: 10}
        , result = j.convert();
      assert.equal(result, undefined);
    })

    it ('should convert test correctly', function(){
      var j = new j2csv.jsonToCSV()
          , test = {name: 'foo', age: 10}
          , result = j.convert([test]);
      assert.equal(result, "\"name\",\"age\"\n\"foo\",10\n");
    })

    it ('should convert test correctly when separator is ;', function(){
      var j = new j2csv.jsonToCSV(';')
          , test = {name: 'foo', age: 10}
          , result = j.convert([test]);
      assert.equal(result, "\"name\";\"age\"\n\"foo\";10\n");
    })

    it ('should convert test correctly when line-end is ;', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , test = {name: 'foo', age: 10}
          , result = j.convert([test]);
      assert.equal(result, "\"name\",\"age\";\n\"foo\",10;\n");
    })
  })

  describe ('buildFieldNames', function() {
    it ('use key-names when empty fieldnames (undefined) are given', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = undefined
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\",\"age\"");
    })

    it ('use key-names when empty fieldnames (null) are given', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = null
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\",\"age\"");
    })

    it ('use key-names when empty fieldnames (empty array) are given', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = []
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\",\"age\"");
    })

    it ('use key-names when fieldnames are given given as string (should be an array)', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = "name, age"
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\",\"age\"");
    })

    it ('build correct fieldnames', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = ["name"]
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\"");
    })

    it ('build correct fieldnames', function(){
      var j = new j2csv.jsonToCSV(',',';')
          , jsonObjArray = [{name: 'foo', age: 10}]
          , fieldNames = ["name", "age"]
          , result = j.buildFieldNames(jsonObjArray, fieldNames);
      assert.equal(result, "\"name\",\"age\"");
    })
  })
})
