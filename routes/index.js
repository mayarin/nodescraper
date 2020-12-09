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
      var entry_titles = dom.window.document.getElementsByTagName('.entry-title');

      for (var i = 0; i < entry_titles.length; i++) {
        console.log(entry_titles[i]);
        // var d = divs[i];
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
