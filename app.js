const port = process.env.PORT || 80;

const express = require('express');
const vhost = require('vhost');
const app = express();

const admin = require('./website/admin/admin');
const front = require('./website/front/front');
 
app.use(vhost('admin.nceng.com', admin));
app.use(vhost('www.nceng.com', front));
 
app.use(express.static('static'));
 
app.use((req, res) => {
    res.status(404).send('Page Not Found!')
});
 
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});