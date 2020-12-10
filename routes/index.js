var express = require('express');
const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const url = 'https://maya-pg.net';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  https.get(url, res => {
    let html = '';
    let title = [];
    let body = [];
    res.on('data', line => html += line);
    res.on('end', () => {

      //console.log(html);
      const dom = new JSDOM(html);
      // console.log(dom.window.document.querySelector('.entry-title').textContent);
      var articles = dom.window.document.getElementsByTagName('article');
      // var articles = dom.window.document.getElementsByTagName('article').getElement;
      // var articles = dom.window.document.getElementsByTagName('article');
      console.log(articles.length);

      for (var i = 0; i < articles.length; i++) {
        console.log(articles[i]);
        // console.log(articles[i].children);

        for (let j = 0; j < articles[i].children.length; j++) {

          res.send(articles[i].children[j].className);
          res.send(articles[i].children[j].textContent);

          console.log('L30 ', articles[i].children[j].className);
          console.log('L31 ', articles[i].children[j].textContent);



        }
      }
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
