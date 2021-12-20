console.log('default.js');
//로그인정보 변수
var loginInfo = {
    isLogin: false,
    token: '',
    memberSeq: -1
};

$(function(){
    fnCheckLoginCookie();
});

//CLick, 박경호, 2021-11-07
function fnClick(targetID) {
    if ( document.getElementById(targetID) !== null ) {
        document.getElementById(targetID).click();
    };
};

//Alert, 박경호, 2021-08-27
function Alert(msg, callback) {
    if ( msg !== null && msg !== '' && msg.length > 0 && typeof msg == 'string' ) {
        alert(msg);
        if ( callback !== null && typeof callback == 'function' ) {
            callback();
        };
    };
};

//Confirm, 박경호, 2021-08-27
function Confirm(msg, callback) {
    if ( msg !== null && msg !== '' && msg.length > 0 && typeof msg == 'string' ) {
        if ( confirm(msg) ) {
            if ( callback !== null && typeof callback == 'function' ) {
                callback();
            };
        };
    };
};



//로그인 쿠키 체크
function fnCheckLoginCookie() {

    let getLoginInfo = $.cookie('NCAdmin');

    if (typeof getLoginInfo !== 'undefined') {
        loginInfo.isLogin = true;
        loginInfo.memberSeq = $.cookie('NCAdmin');
        if (location.pathname == "/") {
            document.location.href="/main";
        };
    } else {
        loginInfo.isLogin = false;
        loginInfo.memberSeq = -1;
        loginInfo.token = "";
    };
    
};

//로그인하기
function fnLogin() {

    let Email = $("#Email").val();
    let Password = $("#Password").val();

    $.post("/Api/Login", {Email:Email, Password:Password}, function(rst){

        if (rst !== null) {
            if (rst.check) {
                console.log(rst);

                loginInfo.isLogin = true;
                loginInfo.memberSeq = rst.data;
                $.cookie('NCAdmin', rst.data, { expires: 7, path: '/'});

                document.location.href = "/Main";
                

            } else {
                Alert(rst.msg);
            };
        };

    });

    return false;

};

//로그아웃하기
function fnLogout() {
    Confirm("정말 로그아웃 하시겠습니까?", function(){
        $.removeCookie('NCAdmin');
        loginInfo.isLogin = false;
        loginInfo.memberSeq = -1;
        loginInfo.token = "";
        document.location.href = '/';
    })
};

//파일을 업로드한다, 박경호, 2021-11-07
function fnUploadFile(formID, callback) {

    if ( document.getElementById(formID) !== null ) {
        if ( typeof callback == 'function' ) {
            
            let xhr = new XMLHttpRequest();
            let formData = new FormData(document.getElementById(formID));
            xhr.onload = function() {
                let jsonResult = JSON.parse(xhr.responseText);
                if (xhr.status === 200 || xhr.status === 201) {
                    if ( jsonResult.check ) {
                        callback(jsonResult.data);
                    } else {
                        Alert(jsonResult.msg);
                    };
                } else {
                    console.error(jsonResult);
                };
            };

            xhr.open('POST', '/Api/upload');
            xhr.send(formData);

        } else {
            console.error('콜백 매개변수가 함수가 아닙니다.');
        };
    };
        
};


//썸네일이 온체인지 되었을 때, 빅경호, 2021-11-07
function fnOnchangeThumbnail(inputID, formID, limit, resultID) {

    if ( document.getElementById(inputID) !== null ) {
        if ( document.getElementById(formID) !== null ) {
            if ( document.getElementById(resultID) !== null ) {
                if ( $('#'+inputID).val() !== '' ) {
                    if ( $('#'+resultID).children('.img-item:not(.d-none)').length < Number(limit) ) {
                        
                        fnUploadFile(formID, function(rst) {

                            let tag = '';
                            tag += `
                                <li class="img-item">
                                    <figure>
                                        <img src="/${rst.path}" alt="${rst.name}" />
                                        <figcaption>${rst.name}</figcaption>
                                    </figure>
                                    <button type="button" onclick="fnOnclickDeleteImageItemButton(this, 'ThumbnailList')" class="btn btn-danger">삭제</button>
                                </li>
                            `;

                            $('#'+resultID).append(tag);
                            $('#'+resultID+'Message').hide();
                            $('#'+inputID).val('');

                        });
                    } else {
                        Alert('이미 최대 업로드수 만큼 업로드 되어있습니다.');
                    }; 
                };
            } else {
                console.error('매개변수 limitTarget으로 노드를 찾을 수 없습니다.');
            };
        } else {
            console.error('매개변수 formID로 노드를 찾을 수 없습니다.');
        };
    } else {
        console.error('매개변수 inputID로 노드를 찾을 수 없습니다.');
    };

};

//이미지 삭제 대기열에 추가, 박경호, 2021-11-07
function fnOnclickDeleteImageItemButton(button, listID) {
    if ( button !== null ) {
        if ( document.getElementById(listID) !== null ) {
            Confirm('해당 이미지를 삭제하시겠습니까?', function(){
                let listNode = $(button).closest('#'+listID)
                $(button).closest('.img-item').addClass('d-none').promise().done(function() {
                    if ( $(listNode).children('.img-item:not(.d-none)').length == 0 ) {
                        $('#ThumbnailListMessage').show();
                    };
                });
            });
        } else {
            console.error('listID로 노드를 찾을 수 없습니다.');
        };
    } else {
        console.error('매개변수로 받은 button이 null 입니다.');
    };
};