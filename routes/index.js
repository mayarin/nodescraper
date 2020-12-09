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
    res.on('data', line => html += line);
    res.on('end', () => {

      //console.log(html);
      const dom = new JSDOM(html);
      // console.log(dom.window.document.querySelector('.entry-title').textContent);
      var articles = dom.window.document.getElementsByTagName('article');
      console.log(articles.length);

      for (var i = 0; i < articles.length; i++) {
        var entry_title = articles[i].getElemntsByClassName('entry-title');

        console.log(entry_title);

        console.log(articles[i].textContent);
        // var d = entry_titles[i];
        // var id = d.getAttribute("id");
        // var filename = id + ".txt"
        // var output = d.innerHTML.replace(/^\s*/gm,"")
        // fs.writeFile(filename, output)
      }
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
