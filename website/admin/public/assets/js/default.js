console.log('default.js');

window.onload = function() {

    fnCheckLoginCookie();

};

//로그인정보 변수
var loginInfo = {
    isLogined: false,
    token: ''
};

//로그인 쿠키 체크
async function fnCheckLoginCookie() {
    console.log('function fnCheckLoginCookie Started');

    let response = await fetch('/Api/CheckLoginCookie', {
        method: 'POST',
        headers: {'Content-Type':'appplication/json'},
        body: JSON.stringify({ jwt: getCookie('jwt') })
    });

    let result = await response.text();

    if ( result !== null ) {

        document.location.href = '/main';

    } else {



    };
    

};

//로그인하기
async function fnLogin() {

    let Id = document.getElementById('Id');
    let Password = document.getElementById('Password');

    let response = await fetch('/Api/Login', {
                        method: 'POST',
                        headers: {'Content-Type':'appplication/json'},
                        body: JSON.stringify({ id: Id, password: Password })
                    });

    let result = await response.text(); // 토큰 획득

    if ( result == 'fail' || result.length == 0 ) {
        alert('로그인 실패');
    } else {
        alert('로그인 성공', result);
        document.cookie = `jwt=${result}`;
        fnCheckLoginCookie();
        
    };


    return false;

};

//로그아웃하기
function fnLogout() {
    document.location.href = '/';
};