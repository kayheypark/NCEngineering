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

module.exports.blockPage = BlockPage;
module.exports.getDefault = GetDefault;