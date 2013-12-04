var fs = require('fs');
var $ = require('cheerio');

function gotXML(xml) {
  var parsedXML = $.load(xml);
  var list=parsedXML('Id').map(function(i, id) {
  		return id.children[0].data;
  }
  ).join(',');
  return list;
}

var filehandle = fs.readFile("../xmlPMIDs/pmidsExample.xml", function(err, data) {
	var x=gotXML(data);
	console.log(x);
});