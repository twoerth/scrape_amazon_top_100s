"use strict";

const fs=require('fs');
const scrape = require('./scrape.js');
const request = require('request');

/*
fs.readFile('test_data/ms_elec_0.html', 'utf8', (err, data) => {
  if (err) throw err;
  console.log( scrape.find_product(data) )
});
*/

//var url = "https://www.amazon.de/gp/movers-and-shakers/ce-de/ref=zg_bsms_pg_1?ie=UTF8&pg=1&ajax=1";
var url = "https://www.amazon.com/gp/new-releases/electronics/ref=zg_bsms_pg_1?ie=UTF8&pg=1&ajax=1";

request( url, ( error, response, html ) => {
  console.log( scrape.find_product( html ) )
})