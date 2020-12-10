var express = require('express');
const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const url = 'https://maya-pg.net';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let title = [];
  let body = [];

  https.get(url, res => {
    let html = '';
    res.on('data', (line) => {
      html += line
    });
    res.on('render', () =>{
      console.log('L20');
    });
    // res.render('index', { title: 'Express' });

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

          if(articles[i].children[j].className == 'entry-header'){
            title[i] = articles[i].children[j].textContent.trim().replace(/\r?\n/g,"");
          }
          if(articles[i].children[j].className == 'entry-content'){
            body[i] = articles[i].children[j].textContent.trim().replace(/\r?\n/g,"");
          }
        }
      }

      console.log(title);
      console.log(body);


    });
  });

});

module.exports = router;
