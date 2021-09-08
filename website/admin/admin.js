// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const admin = express();
require('../../library/database.js');
const fn = require('../../library/function.js');
const jwtSecretKey = require('../../config/jwt/secretKey');
const jwtOptions = require('../../config/jwt/options');
const jwt = require('jsonwebtoken');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'upload/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    })
});

// Body Parser
admin.use(express.urlencoded({extended: false}));
admin.use(express.json());

// Static Files
admin.use('up', express.static(__dirname + '/up'));
admin.use('/assets', express.static(__dirname + '/public/assets'));
admin.use('/vendor', express.static(__dirname + '/public/vendor'));

// Set Templating Engine
admin.use(expressLayouts);
admin.set('views', __dirname + '/views');
admin.set('layout', './layouts/default');
admin.set("layout extractScripts", true);
admin.set("layout extractStyles", true);
admin.set('view engine', 'ejs');

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
admin.get('/', (req, res) => {
    res.render('pages/login', {layout: false});
});
admin.get('/main', (req, res) => {
    res.render('pages/main', {pagename: '대시보드'});
});

admin.get('/profile', (req, res) => {
    // res.render('pages/mypage/profile', {pagename: '내 프로필'});
    fn.blockPage(res);
});
admin.get('/changepassword', (req, res) => {
    res.render('pages/mypage/changepassword', {pagename: '비밀번호 변경'});
});

admin.get('/company', (req, res) => {
    //res.render('pages/basic/company', {pagename: '기업정보'});
    fn.blockPage(res);
});
admin.get('/termsofuse', (req, res) => {
    //res.render('pages/basic/termsofuse', {pagename: '이용약관'});
    fn.blockPage(res);
});
admin.get('/privacy', (req, res) => {
    //res.render('pages/basic/privacy', {pagename: '개인정보 처리방침'});
    fn.blockPage(res);
});
admin.get('/faq', (req, res) => {
    res.render('pages/basic/faq', {pagename: '자주묻는질문'});
});
admin.get('/footer', (req, res) => {
    //res.render('pages/basic/footer', {pagename: '하단정보'});
    fn.blockPage(res);
});

admin.get('/product/list', (req, res) => {

    let query = `select * from product where IsEnabled=1 order by RegistDate desc`;

    global.pool.getConnection((err, connection) => {
        
        if (err) throw err;

        connection.query(query, (err, rows) => {

            connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)

            if ( !err ) {

                if ( rows.length > 0 ) {

                    res.render('pages/product/list', {pagename: '제품 목록', data: rows});
                    console.log('rows', rows);
                    
                } else {

                    return res.send({ look: true, msg: '대상이 없습니다', data: null, token: null });

                };

            } else {

                console.log(err);

            };

        });

    });
});

admin.get('/product/view', (req, res) => {
    let seq = fn.getNumber(req.query.ProductSeq, -1);
    let query = `select * from product where IsEnabled=1 and ProductSeq=${seq}`;
    console.log('실행된쿼리', query);

    global.pool.getConnection((err, connection) => {
        
        if (err) throw err;

        connection.query(query, (err, rows) => {

            connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)

            if ( !err ) {

                if ( rows.length > 0 ) {

                    res.render('pages/product/view', {pagename: '제품 상세화면', data: rows[0]});
                    console.log('rows[0]', rows[0]);
                    
                } else {

                    return res.send({ look: true, msg: '대상이 없습니다', data: null });

                };

            } else {

                console.log(err);

            };

        });

    });
    
});
admin.get('/product/edit', (req, res) => {

    let seq = fn.getNumber(req.query.ProductSeq, -1);

    if ( seq > 0 ) {
        let query = `select * from product where IsEnabled=1 and ProductSeq=${seq}`;
        console.log('실행된쿼리', query);

        global.pool.getConnection((err, connection) => {
            
            if (err) throw err;

            connection.query(query, (err, rows) => {

                connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)

                if ( !err ) {

                    if ( rows.length > 0 ) {

                        res.render('pages/product/edit', {pagename: '제품 수정', data: rows[0]});
                        console.log('rows[0]', rows[0]);
                        
                    } else {

                        return res.send({ look: true, msg: '대상이 없습니다', data: null });

                    };

                } else {

                    console.log(err);

                };

            });

        });
        
    } else {
        res.render('pages/product/edit', {pagename: '제품 등록', data: null});
    };
    
});
admin.get('/product/new', (req, res) => {
    res.render('pages/product/new', {pagename: '제품 등록'});
});

admin.get('/inquiry/list', (req, res) => {
    res.render('pages/inquiry/list', {pagename: '문의 목록'});
});
admin.get('/inquiry/view', (req, res) => {
    res.render('pages/inquiry/view', {pagename: '문의 상세화면'});
});
admin.get('/inquiry/edit', (req, res) => {
    res.render('pages/inquiry/edit', {pagename: '문의 수정'});
});

admin.get('/board/list', (req, res) => {
    res.render('pages/board/list', {pagename: '공지사항 목록'});
});
admin.get('/board/view', (req, res) => {
    //res.render('pages/board/view', {pagename: '게시판 상세화면'});
    fn.blockPage(res);
});
admin.get('/board/edit', (req, res) => {
    //res.render('pages/board/edit', {pagename: '게시판 수정'});
    fn.blockPage(res);
});
admin.get('/board/new', (req, res) => {
    //res.render('pages/board/new', {pagename: '게시판 등록'});
    fn.blockPage(res);
});

//Api List
//로그인
admin.post('/Api/Member', (req, res) => {

    let Email = fn.getDefault(req.body.Email, '');
    let Password = fn.getDefault(req.body.Password, '');

    let query = `SELECT * FROM member WHERE Email = '${Email}' AND Password = '${Password}'`;

    if ( Email.length > 0 ) {

        if ( Password.length > 0 ) {

            global.pool.getConnection((err, connection) => {
        
                if (err) throw err;
        
                connection.query(query, (err, rows) => {

                    connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)
        
                    if ( !err ) {

                        if ( rows.length > 0 ) {

                            //아래 jwtSecretKey와 jwtOptions는 보안사항이므로 비공개합니다.
                            //다만 형식은 다음과 같습니다.
                            // jwtSecretKey는 'SeCrEtKeY'처럼 String을 반환합니다.
                            // jwtOptions은 {
                            //                  algorithm : "HS256", // 해싱 알고리즘( 알고리즘의 더 많은 종류는 https://jwt.io/ 에 있습니다.)
                            //                  expiresIn : "30m",  // 토큰 유효 기간
                            //                  issuer : "issuer" // 발행자
                            //              }
                            //처럼 Object를 반환합니다.

                            const token = jwt.sign({memberSeq: rows[0].MemberSeq}, jwtSecretKey, jwtOptions);

                            return res.send({ look: true, msg: '대상을 발견했습니다', data: rows[0], token: token });
                            
                        } else {

                            return res.send({ look: true, msg: '대상이 없습니다', data: null, token: null });

                        };

                    } else {

                        console.log(err);

                    };
        
                });
        
            });

        } else {

            return res.send({ look: false, msg: '비밀번호를 입력해주세요', data: null, token: null });

        };

    } else {

        return res.send({ look: false, msg: '이메일을 입력해주세요', data: null, token: null });

    };

});

///Api/Product/Edit
admin.post('/Api/Product/Edit', (req, res) => {

    let Seq = fn.getNumber(req.body.Seq, -1);
    console.log('req.body.Name', req.body.Name)
    
    
    if ( Seq > 0 ) {
        let Name = fn.getDefault(req.body.Name, null);
        let IsShow = fn.getDefault(req.body.IsShow, null);
        let Description = fn.getDefault(req.body.Description, null);
        let Price = fn.getNumber(req.body.Price, -1);
        let ThumbnailURL = fn.getDefault(req.body.ThumbnailURL, null);
        let query = `UPDATE Product SET Name = '${Name}', IsShow = '${IsShow}', Description = '${Description}', Price = ${Price}, ThumbnailURL = '${ThumbnailURL}' WHERE ProductSeq=${Seq}`;
        console.log('수정 쿼리:', query);
        global.pool.getConnection((err, connection) => {
        
            if (err) throw err;
    
            connection.query(query, (err, rows) => {

                connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)
    
                if ( !err ) {

                    res.json({msg: '정상적으로 제품 수정이 완료되었습니다.', check: true});

                } else {

                    res.json({msg: '제품 수정에 실패하였습니다. 관리자에게 문의 바랍니다.', check: false});
                    console.log(err);

                };
    
            });
    
        });
        
        
    } else {
        let Name = fn.getDefault(req.body.Name, null);
        let IsShow = fn.getDefault(req.body.IsShow, null);
        let Description = fn.getDefault(req.body.Description, null);
        let Price = fn.getNumber(req.body.Price, -1);
        let ThumbnailURL = fn.getDefault(req.body.ThumbnailURL, null);
        let query = `
        INSERT INTO Product
        ( Name, IsShow, Description, Price, ThumbnailURL ) 
        VALUES 
        ( '${Name}', '${IsShow}', '${Description}', '${Price}', '${ThumbnailURL}' )
        `;
        
        global.pool.getConnection((err, connection) => {
        
            if (err) throw err;
    
            connection.query(query, (err, rows) => {

                connection.release(); // return the connection to pool (커넥션을 끝내는 구문으로 반드시 존재해야함)
    
                if ( !err ) {

                    res.json({msg: '정상적으로 제품 등록이 완료되었습니다.', check: true});

                } else {

                    res.json({msg: '제품 등록에 실패하였습니다. 관리자에게 문의 바랍니다.', check: false});
                    console.log(err);

                };
    
            });
    
        });

    };


});

// Multer Upload
admin.post('/Api/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.json(req.file);
});
admin.post('/Api/upload', upload.array('file', 10), (req, res) => {
    console.log(req.files);
    res.json(req.files);
});

module.exports = admin;