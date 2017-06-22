"use strict;"

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const URLs = [
{url:"https://www.banggood.com/de/top-sellers-1091.html", text:"Electronics"},
{url:"https://www.banggood.com/de/top-sellers-140.html", text:"Cell Phones &amp; Accessories "},
{url:"https://www.banggood.com/de/top-sellers-1697.html", text:"Lights &amp; Lighting"},
{url:"https://www.banggood.com/de/top-sellers-896.html", text:"Sports &amp; Outdoor"},
{url:"https://www.banggood.com/de/top-sellers-133.html", text:"Toys and Hobbies"},
{url:"https://www.banggood.com/de/top-sellers-155.html", text:"Computer &amp; Networking"},
{url:"https://www.banggood.com/de/top-sellers-1031.html", text:"Home and Garden"},
{url:"https://www.banggood.com/de/top-sellers-274.html", text:"Clothing and Apparel"},
{url:"https://www.banggood.com/de/top-sellers-892.html", text:"Health &amp; Beauty"},
{url:"https://www.banggood.com/de/top-sellers-1134.html", text:"Automobiles &amp; Motorcycles"},
{url:"https://www.banggood.com/de/top-sellers-170.html", text:"Jewelry and Watch"},
{url:"https://www.banggood.com/de/top-sellers-1696.html", text:"Apple Accessories"},
{url:"https://www.banggood.com/de/top-sellers-3798.html", text:"Bags &amp; Shoes"}
];

const FILES_DIRECTORY = "test_data/banggood/";
/*
// Save data to files for efficient debugging

for( const page of URLs ) {
	console.log( page );
	request( page.url, ( error, response, html ) => {
		console.log( response );
		fs.writeFile( FILES_DIRECTORY + page.text + ".html", html, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
}

*/

fs.readdir( FILES_DIRECTORY, (err, files) => {
	for( const file of files ) {
		console.log( file );
		fs.readFile( FILES_DIRECTORY + file, (err, html) => {
			console.log( file );
		    $ = cheerio.load( html );
		    $("ul.goodlist_1 li").map( (i, p) => {
		        const p_p = $(p);
				const product = {
					category: file,
					position: i,
					url: p_p.find("span.img a").attr("href"),
					name: p_p.find("span.img a").attr("title"),
					img: p_p.find("span.img a img").attr("src"),
					off: p_p.find("span.img a i").text(),
					rank: p_p.find("span.rank").text(),
					rating: p_p.find("span.review a i.star i").attr("style"),
					reviews: p_p.find("span.review a").text(),
				};
				console.info( product );
				return product;
			});
		});
	}
});