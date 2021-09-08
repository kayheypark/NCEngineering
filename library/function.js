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

function BlockPage(res) {
    return (res.send(`<script>alert('해당 기능은 제작 대기중입니다.');history.back();</script>`));
};

function GetDefault(str, defaultValue) {

    let result = '';

    try {
        if ( str !== null && str !== undefined ) {
            if ( String(str).trim() !== '' && String(str) !== 'NaN' ) {
                result = String(str).trim();
            } else {
                result = defaultValue;
            };
        } else {
            result = defaultValue;
        };
    } catch (e) {
        result = defaultValue;
    };

    return result;

};

function GetNumber(str, defValue) {
    let result = 0;

    try {
        if (str !== null && str !== undefined) {
            if (IsNumeric(str)) {
                result = Number(str);
            } else {
                result = defValue;
            }
        } else {
            result = defValue;
        }
    } catch (e) {
        result = defValue;
    }

    return result;
};

function IsNumeric(str) {
    let result = false;

    try {
        if (str !== null && String(str).trim() !== "") {
            let regex = /[0-9]+/g;
            result = regex.test(str);
        } else {
            result = false;
        }
    } catch (e) {
        result = false;
    }

    return result;
};

function TextWithoutHTML(str) {
    let result = '';

    try {

        if (!IsNullOrEmpty(str)) {
            result = str.replace(/<[^>]+>/g, '')
        };

    } catch(e) {

        return e.message;

    }
        
    return result;
};

function NumberWithComma(num) {
    
    let result = '';

    try {

        if (!IsNullOrEmpty(num)) {
            result = Number(num).toLocaleString("ko-KR");
        };

    } catch(e) {

        return e.message;

    }
        
    return result;

};

module.exports.isNullOrEmpty = IsNullOrEmpty;
module.exports.blockPage = BlockPage;
module.exports.getDefault = GetDefault;
module.exports.getNumber = GetNumber;
module.exports.textWithoutHTML = TextWithoutHTML;
module.exports.numberWithComma = NumberWithComma;