// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const front = express();
require('../../library/database.js');

// Body Parser
front.use(express.urlencoded({extended: false}));
front.use(express.json());

// Static Files
front.use('/assets', express.static('./public/assets'));
front.use('/vendor', express.static('./public/vendor'));

// Set Templating Engine
front.use(expressLayouts);
front.set('views', __dirname + '/views');
front.set('layout', './layouts/default');
front.set("layout extractScripts", true);
front.set("layout extractStyles", true);
front.set('view engine', 'ejs');

//Page List
front.get('/', (req, res) => {
    res.render('index', {pagename: '메인'});
});
front.get('/about', (req, res) => {
    res.render('about');
});

//Api List
front.get('', (req, res) => {
    global.pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * FROM product', (err, rows) => {
            connection.release(); // return the connection to pool

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            };

        });

    });
});

module.exports = front;