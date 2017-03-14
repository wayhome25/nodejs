var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine','jade');
app.set('views','./views');
app.listen(3000, function(){ console.log('connected 3000 port!'); })
app.use('/javascripts', express.static('./javascripts'));
// 라우터 시작

app.get('/', function(req, res){
  res.render('index');
})


// 라우터 끝
