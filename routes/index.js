var express = require('express');
const https = require('https');
const url = 'https://maya-pg.net';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  https.get(url, res => {
    let html = '';
    res.on('data', line => html += line);
    res.on('end', () => {
      console.log(html);
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
