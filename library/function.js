function ServiceReady(res) {
    return (res.send(`<script>alert('준비중입니다. 이전페이지로 돌아갑니다.');history.back();</script>`));
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

module.exports.serviceReady = ServiceReady;
module.exports.getDefault = GetDefault;