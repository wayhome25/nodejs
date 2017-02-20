// 테스트에욤

var express = require('express');
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/topic/:id/:mode', function(req, res){
// 라우터 경로의 변경
	var topic = [
		'javascript is...',
		'nodejs is...',
		'express is...'
	];
	var li = `
	<li><a href="/topic/0">js</a></li>
	<li><a href="/topic/1">nodejs</a></li>
	<li><a href="/topic/2">express</a></li>
	`
	res.send(li + '<br>' + topic[req.params.id]  + req.params.mode);
	//path 방식을 사용하는 url의 경우 params를 통해서 값을 가져올 수 있음
})

app.get('/form',function(req, res){
	res.render('form');
});
app.get('/form_receiver', function(req, res){
	var title = req.query.title;
	var desc = req.query.desc;
	res.send(title+', 그리고'+desc);
});
app.post('/form_receiver', function(req, res) {
	var t = req.body.title;
	var d = req.body.desc;
	res.send(t+','+d);
});
app.get('/template', function(req, res){
	res.render('temp', {time: Date(), _title: 'Jade'});
}); // 템플릿 엔진의 소스코드를 가지고 와서 웹페이지를 만들어 내는 res 객체의 메소드
app.get('/',function(req, res){
// 여기서 get을 라우터라고 한다 (라우팅 : 길찾기)
	res.send('hell siwa!');
});
app.get('/dynamic', function(req, res){
	var lis = '';
	for(var i = 0; i <5; i++){
		lis += '<li>coding ' + i + '</li>';
	}
	var output = `
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	  </head>
	  <body>
	    hello Dynamic html~~!
			<ul>
				${lis} <!-- 문자열 내에서 변수 사용 -->
			</ul>
	  </body>
	</html>`;
	res.send(output);
});
app.get('/bento', function(req, res){
	res.send('hello bento! <img src="/bento.png">');
});
app.get('/login',function(req, res){
	res.send('<h1>login please siwa!</h1>');
});
app.listen(3000, function(){
	console.log('connected 3000 port!');
});
