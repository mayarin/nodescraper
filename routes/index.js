var express = require('express');
const https = require('https');
const jsdom = require('jsdom');
const url = 'https://maya-pg.net';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  https.get(url, res => {
    let html = '';
    res.on('data', line => html += line);
    res.on('end', () => {

      //console.log(html);
      const dom = new JSDOM(html);
      console.log(dom.window.document.querySelector('.entry-title').textContent);

    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
