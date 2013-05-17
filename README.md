json2csv.js
===========

JavaScript function which converts JSON to CSV

Example:

var test = {name: "foo", age: 777, commits: [1,2,3]}
jsonToCSV([test], ",", "", ["NAME", "AGE"])

This will return the following string:


"NAME","AGE","COMMITS";

"foo",777,"1,2,3";


Notes:
* the second parameter (field names) can be left empty. If empty the keynames will be used as field names
* also dates can be used, e.g. var test = {name: "foo", age: 777, commits: [new Date()]}
