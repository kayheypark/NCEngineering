console.log('default.js');

window.onload = function() {

    fnCheckLoginCookie();

};

//로그인정보 변수
var loginInfo = {
    isLogined: false,
    token: '',
    memberSeq: -1
};

//로그인 쿠키 체크
function fnCheckLoginCookie() {
    console.log('function fnCheckLoginCookie Started');
};

//쿠키체크

//로그인하기
function fnLogin() {
    document.location.href = '/main';
    return false;
};

//로그아웃하기
function fnLogout() {
    document.location.href = '/';
};