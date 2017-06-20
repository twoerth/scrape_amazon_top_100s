"use strict;"

const cheerio = require('cheerio');

// Movers and Shakers look like https://www.amazon.de/gp/movers-and-shakers/ce-de/ref=zg_bsms_pg_1?ie=UTF8&pg=1&ajax=1

exports.find_product = ( country, category, type, page, html ) => {
    $ = cheerio.load( html );
    return( $(".zg_itemImmersion").map( (i, p) => {
        const p_p = $(p);
        const product = {
            country: country,
            category: category,
            type: type,
            page: page,
            rank: p_p.find(".zg_rankNumber").text().trim(),
            change: p_p.find(".zg_salesMovement").text(),
            url: p_p.find(".p13n-asin a").first().attr('href'),
            title: p_p.find(".p13n-asin img").first().attr('alt'),
            img: p_p.find(".p13n-asin img").first().attr('src'),
            rating: p_p.find(".a-icon-star > .a-icon-alt").text(),
            num_ratings: p_p.find(".a-size-small").text(),
            price: p_p.find(".p13n-sc-price").text()
        }
        
//        console.log( product )
        return product;
    }).get() )
}

exports.generate_urls = ( country ) => {
    const TYPES = [ "movers-and-shakers", "bestsellers", "new-releases" ]
    const CATEGORIES = {
        de: ["automotive", "baby", "diy", "beauty", "apparel", "lighting", "officeproduct", "computers", "drugstore", "appliances", "ce-de", "garden", "industrial", "pet-supplies", "photo", "luggage", "kitchen", "grocery", "musical-instruments", "jewelry", "shoes", "toys", "sports", "watch"]
    }
    const PAGES = [ 1, 2, 3, 4, 5]
    
    const URLS = [];
    
    for( const category of CATEGORIES[ country ] ) {
        for( const type of TYPES ) {
            for( const page of PAGES ) {
                URLS.push( {
                    url: "https://www.amazon." + country + "/gp/" + type + "/" + category + "/ref=zg_bsms_pg_1?ie=UTF8&pg=" + page + "&ajax=1",
                    country: country,
                    type: type,
                    category: category,
                    page: page
                } );
            }
        }
    }
    
    return URLS;
}


