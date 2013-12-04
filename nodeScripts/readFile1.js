var $ = require('cheerio');
// var request = require('request');
var fs = require('fs');

function gotXML(xml) {
  // if (err) return console.error(err);
  var parsedXML = $.load(xml);
  parsedXML('IdList').map(function(i, list) {
  	// console.log($(list).find('id'));
  	// console.log($(list).find('id').length);
  	for (var i = 0; i < $(list).find('id').length; i++) {
  		console.log($(list).find('id')[i].children[0].data);
  	};

  }
  );
}

var filehandle = fs.readFile("../xmlPMIDs/pmidsExample.xml", function(err, data) {
	// data.setEncoding('utf8');
	// console.log(data);
	gotXML(data);
});