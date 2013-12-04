var fs = require('fs');
var http = require('http');
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
	var options = {
		host: 'eutils.ncbi.nlm.nih.gov',
		port: 80,
		path: '/entrez/eutils/efetch.fcgi',
		method: 'POST'
	};

var texto='';

	var req = http.request(options, function(res) {
		var stream = fs.createWriteStream("file2.txt",{flags: 'a'});
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			// console.log(chunk);
			stream.on("open", function() {
				texto+=chunk;
				stream.end(texto,'utf8');
			});
			console.log(texto);

		});
		// console.log(texto);
		
	});
	req.write("db=pubmed");
	req.write("&retmode=xml");
	req.write("&id="+x);
	req.pipe(stream, {end: false});
	// console.log("&id="+x);
	req.end();
});