var express = require('express');
const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const url = 'https://maya-pg.net';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = [];

  https.get(url, response => {
    let html = '';
    response.on('data', (line) => {
      html += line
    });
    response.on('end', () => {
      //console.log(html);
      const dom = new JSDOM(html);
      var articles = dom.window.document.getElementsByTagName('article');

      for (var i = 0; i < articles.length; i++) {
        console.log(articles[i]);
        // console.log(articles[i].children);
        var title = '';
        var body = '';
        var link = '';

        for (let j = 0; j < articles[i].children.length; j++) {
          if(articles[i].children[j].className == 'entry-header'){
            title = articles[i].children[j].textContent.trim().replace(/\r?\n/g,"");
          }
          if(articles[i].children[j].className == 'entry-content'){
            body = articles[i].children[j].textContent.trim().replace(/\r?\n/g,"");
          }
          if(articles[i].children[j].className == 'post-thumbnail'){
            link = articles[i].children[j].href;
          }
        }

        data[i] = {
          'title': title,
          'body': body,
          'link': link,
        }

      }

      res.render('index', { title: 'Express', list_data : data });

      console.log(data);

    });
  });

});

module.exports = router;
