var fs = require('fs');
var http = require('http');
var $ = require('cheerio');

function gotXML(xml) {
  var parsedXML = $.load(xml);
  var list=parsedXML('Id').map(function(i, id) {
  		return id.children[0].data;
  }
  );
  var ids=[];
  ids[0]=list.length;
  ids[1]=list.join(',');
  return ids;
}

var filehandle = fs.readFile("../xmlPMIDs/pmidsExample.xml", function(err, data) {
	var x=gotXML(data);
	console.log(x[0]);
	console.log(x[1]);
	var options = {
		host: 'eutils.ncbi.nlm.nih.gov',
		port: 80,
		path: '/entrez/eutils/efetch.fcgi',
		method: 'POST'
	};

var texto='';

	var req = http.request(options, function(res) {
		res.on('data', function (chunk) {
			fs.appendFile('../xmlAE/eureka.xml', chunk, function (err) {
				if(err) throw err;
			});
		});
		
	});
	req.write("db=pubmed");
	req.write("&retmode=xml");
	req.write("&id="+x);
	req.end();
});