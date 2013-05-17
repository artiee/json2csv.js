json2csv.js
===========

JavaScript function which converts JSON to CSV (comma-separated values).

Example:

var test = {name: "foo", age: 777, commits: [1,2,3]}

jsonToCSV([test], ",", ";", ["NAME", "AGE"])

This will return the following string:


"NAME","AGE","COMMITS";

"foo",777,"1,2,3";


Notes:
* the separator, lineEnd and fieldNames can be left empty. If field names are left empty, the keynames will be used as field names
* separator doesn't have to be comma, but any character or string can be used
* the last character for the line can be given as parameter (lineEnd). This can also be a string.
* new line -character (\n) is automatically added after each line
* also dates can be used, e.g. var test = {name: "foo", age: 777, commits: [new Date()]}
