console.log('base.js');

function IsNullOrEmpty(obj) {
    let result = true;

    try {
        if (obj !== null && obj !== undefined) {
            if (String(obj).trim() !== "" && String(obj) !== "NaN") {
                result = false;
            }
        }
    } catch (e) {
        result = true;
    }

    return result;
};

function RequestGet(name) {
    let result = "";
    let url = location.href;
    let tmp = "";
    if (url.trim() != "" && url.indexOf("?") > -1) {
        url = url.substring(url.indexOf("?") + 1);
        if (url.indexOf("&") > -1) {
            let paramData = url.split('&');
            
            for (let i = 0; i < paramData.length; i++) {
                if (paramData[i].indexOf("=") > -1) {
                    tmp = paramData[i].split('=');
                    if (tmp[0] === name) {
                        result = tmp[1];
                        break;
                    }
                }
            }
        } else if (url.indexOf("=") > -1) {
            tmp = url.split('=');
            if (tmp[0] === name) {
                result = tmp[1];
            }
        }
    }
    return result;
};