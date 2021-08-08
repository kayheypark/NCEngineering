// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const admin = express();
require('../../library/database.js');
const fn = require('../../library/function.js');

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
    // res.render('pages/mypage/profile', {pagename: '내 프로필'});
    fn.serviceReady(res);
});
admin.get('/changepassword', (req, res) => {
    res.render('pages/mypage/changepassword', {pagename: '비밀번호 변경'});
});

admin.get('/company', (req, res) => {
    //res.render('pages/basic/company', {pagename: '기업정보'});
    fn.serviceReady(res);
});
admin.get('/termsofuse', (req, res) => {
    //res.render('pages/basic/termsofuse', {pagename: '이용약관'});
    fn.serviceReady(res);
});
admin.get('/privacy', (req, res) => {
    //res.render('pages/basic/privacy', {pagename: '개인정보 처리방침'});
    fn.serviceReady(res);
});
admin.get('/faq', (req, res) => {
    res.render('pages/basic/faq', {pagename: '자주묻는질문'});
});
admin.get('/footer', (req, res) => {
    //res.render('pages/basic/footer', {pagename: '하단정보'});
    fn.serviceReady(res);
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
    //res.render('pages/board/list', {pagename: '게시판 리스트'});
    fn.serviceReady(res);
});
admin.get('/board/view', (req, res) => {
    //res.render('pages/board/view', {pagename: '게시판 상세화면'});
    fn.serviceReady(res);
});
admin.get('/board/edit', (req, res) => {
    //res.render('pages/board/edit', {pagename: '게시판 수정'});
    fn.serviceReady(res);
});
admin.get('/board/new', (req, res) => {
    //res.render('pages/board/new', {pagename: '게시판 등록'});
    fn.serviceReady(res);
});

//Api List
//아이디로 회원정보 조회
admin.post('/Api/Member', (req, res) => {

    let Email = fn.getDefault(req.body.Email, '');
    let query = `SELECT * FROM member WHERE Email = '${Email}'`;

    if (Email.length > 0) {

        global.pool.getConnection((err, connection) => {
    
            if (err) throw err;
    
            connection.query(query, (err, rows) => {
                connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)
    
                if (!err) {
                    if ( rows.length > 0 ) {
                        return res.send(rows);
                    } else {
                        return res.send({ msg: '해당 이메일로 등록된 계정이 존재하지 않습니다.' });
                    };
                } else {
                    console.log(err);
                };
    
            });
    
        });

    } else {

        return res.send({ msg: '이메일을 입력해주세요' });

    };

});

module.exports = admin;