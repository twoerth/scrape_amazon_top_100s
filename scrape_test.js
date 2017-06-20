"use strict";

const fs = require('fs');
const scrape = require('./scrape.js');
const request = require('request');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'http://elastic:changeme@127.0.0.1:9200',
	requestTimeout: Infinity, // Tested
	keepAlive: true // Tested
});

/*
fs.readFile('test_data/ms_elec_0.html', 'utf8', (err, data) => {
  if (err) throw err;
  console.log( scrape.find_product(data) )
});
*/

//var url = "https://www.amazon.com/gp/movers-and-shakers/electronics/ref=zg_bsms_pg_1?ie=UTF8&pg=1&ajax=1";
//var url = "https://www.amazon.com/gp/new-releases/electronics/ref=zg_bsms_pg_1?ie=UTF8&pg=1&ajax=1";

/*
request( url, ( error, response, html ) => {
  console.log( scrape.find_product( html ) )
})
*/

for (const page of scrape.generate_urls("de")) {

	request(page.url, (error, response, html) => {
		const ops = []
		for( const doc of scrape.find_product(page.country, page.category, page.type, page.page, html) ) {
			ops.push({ index: { _index: 'myindex', _type: 'mytype' } })
			ops.push( doc )
		}
		client.bulk(
			{
				body: ops
			},
			function(error, response) {
				console.log( error );
			}
		);
		
	});
}
