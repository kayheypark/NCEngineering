﻿// Imports
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
    res.render('pages/login', {layout: false});
});
admin.get('/main', (req, res) => {
    res.render('pages/main', {pagename: '대시보드'});
});

admin.get('/profile', (req, res) => {
    res.render('pages/mypage/profile', {pagename: '내 프로필'});
});
admin.get('/changepassword', (req, res) => {
    res.render('pages/mypage/changepassword', {pagename: '비밀번호 변경'});
});

admin.get('/company', (req, res) => {
    res.render('pages/basic/company', {pagename: '기업정보'});
});
admin.get('/termsofuse', (req, res) => {
    res.render('pages/basic/termsofuse', {pagename: '이용약관'});
});
admin.get('/privacy', (req, res) => {
    res.render('pages/basic/privacy', {pagename: '개인정보 처리방침'});
});
admin.get('/faq', (req, res) => {
    res.render('pages/basic/faq', {pagename: '자주묻는질문'});
});
admin.get('/footer', (req, res) => {
    res.render('pages/basic/footer', {pagename: '하단정보'});
});

admin.get('/product/list', (req, res) => {
    res.render('pages/product/list', {pagename: '제품 리스트'});
});
admin.get('/product/view', (req, res) => {
    res.render('pages/product/view', {pagename: '제품 상세화면'});
});
admin.get('/product/edit', (req, res) => {
    res.render('pages/product/edit', {pagename: '제품 수정'});
});
admin.get('/product/new', (req, res) => {
    res.render('pages/product/new', {pagename: '제품 등록'});
});

admin.get('/inquiry/list', (req, res) => {
    res.render('pages/inquiry/list', {pagename: '문의 리스트'});
});
admin.get('/inquiry/view', (req, res) => {
    res.render('pages/inquiry/view', {pagename: '문의 상세화면'});
});
admin.get('/inquiry/edit', (req, res) => {
    res.render('pages/inquiry/edit', {pagename: '문의 수정'});
});

admin.get('/board/list', (req, res) => {
    res.render('pages/board/list', {pagename: '게시판 리스트'});
});
admin.get('/board/view', (req, res) => {
    res.render('pages/board/view', {pagename: '게시판 상세화면'});
});
admin.get('/board/edit', (req, res) => {
    res.render('pages/board/edit', {pagename: '게시판 수정'});
});
admin.get('/board/new', (req, res) => {
    res.render('pages/board/new', {pagename: '게시판 등록'});
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