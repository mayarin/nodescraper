var express = require('express');
const url = require('url')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const proxyUrl = url.parse('https://maya-pg.net')
  proxyUrl.rejectUnauthorized = false // 証明書によるエラーを無視

  AWS.config.update({
    httpOptions: {
      agent: HttpsProxyAgent(proxyUrl)
    }
  })


  // res.render('index', { title: 'Express' });
});

module.exports = router;
