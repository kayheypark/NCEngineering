// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const front = express();
require('../../library/database.js');
const fn = require('../../library/function.js');


// Body Parser
front.use(express.urlencoded({extended: false}));
front.use(express.json());

// Static Files
front.use('partials', express.static(__dirname + '/views/partials'));
front.use('/assets', express.static(__dirname + '/public/vendor'));
front.use('/asset', express.static(__dirname + '/public/assets'));

// Set Templating Engine
front.use(expressLayouts);
front.set('views', __dirname + '/views');
front.set('layout', './layouts/default');
front.set("layout extractScripts", true);
front.set("layout extractStyles", true);
front.set('view engine', 'ejs');

let siteInfo = {
};

/************************************************************
   Return Functions for EJS
************************************************************/

siteInfo["isNullOrEmpty"] = function(str) {
    return fn.isNullOrEmpty(str);
};
siteInfo["textWithoutHTML"] = function(str) {
    return fn.textWithoutHTML(str);
};
siteInfo["numberWithComma"] = function(str) {
    return fn.numberWithComma(str);
};

//Page List
front.get('/', (req, res) => {
    res.render('main', {pagename:'메인', pagecategory: 'main'});
});
front.get('/contact', (req, res) => {
    res.render('contact', {pagename:'문의하기', pagecategory: 'contact'});
});
front.get('/about', (req, res) => {
    res.render('about', {pagename:'회사소개', pagecategory: 'about'});
});


//Api List


module.exports = front;