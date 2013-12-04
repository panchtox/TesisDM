var $ = require('cheerio');
// var request = require('request');
var fs = require('fs');

function gotXML(xml) {
  // if (err) return console.error(err);
  var parsedXML = $.load(xml);
  parsedXML('IdList').map(function(i, article) {
  	console.log($(article).find('id'));

  }
  );
}

var filehandle = fs.readFile("../xmlPMIDs/pmidsExample.xml", function(err, data) {
	// data.setEncoding('utf8');
	console.log(data);
	gotXML(data);
});