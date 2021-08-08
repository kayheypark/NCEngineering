function ServiceReady(res) {
    return (res.send(`<script>alert('준비중입니다. 이전페이지로 돌아갑니다.');history.back();</script>`));
};

module.exports.serviceReady = ServiceReady;