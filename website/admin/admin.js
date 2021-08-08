// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const admin = express();
require('../../library/database.js');

// Body Parser
admin.use(express.urlencoded({extended: false}));
admin.use(express.json());

// Static Files
admin.use('/assets', express.static(__dirname + '/public/assets'));
admin.use('/vendor', express.static(__dirname + '/public/vendor'));

// Set Templating Engine
admin.use(expressLayouts);
admin.set('views', __dirname + '/views');
admin.set('layout', './layouts/default');
admin.set("layout extractScripts", true);
admin.set("layout extractStyles", true);
admin.set('view engine', 'ejs');

//Page List
admin.get('/', (req, res) => {
    res.render('login', {layout: false});
});
admin.get('/main', (req, res) => {
    res.render('main', {pagename: '대시보드'});
});

//Api List
admin.get('', (req, res) => {
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

module.exports = admin;