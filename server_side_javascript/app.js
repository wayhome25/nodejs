var express = require('express'); // express 모듈을 로드해서 변수에 담는다.
var app = express(); // express 모듈은 함수라서 () 실행하면 application리턴
var bodyParser = require('body-parser')
app.set('view engine', 'jade'); // 템플릿 엔진을 제이드로 설정한다.
app.set('views','./views'); // 탬플릿 엔진을 사용한 파일의 경로를 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/form', function(req, res){
		res.render('form');
})
// app.get('/result', function(req, res){
// 		var title = req.query.title;
// 		var desc = req.query.desc;
// 		res.send(title+', '+desc);
// });
app.post('/result', function(req, res){
		var title = req.body.title;
		var desc = req.body.desc;
		res.send(title+', '+desc);
})
app.get('/template', function(req, res){
	res.render('index',{_title:'template', time:Date()});
});
app.get('/', function(req, res){
	res.send('<h1>welcome to home<h1>, <img src="/bento.png">');
});//라우터
app.get('/login', function(req, res){
	res.send('<h1>login please</h1>');
});
app.listen(3000,function(){
// app에는 listen 이라는 메소드가 있어서, 첫번째 인자로 포트번호를 지정해주면 웹앱이 3000번 포트를 리스닝 하게된다. 성공하면 두번째 인자로 콜백함수를 실행한당.
	console.log('connected 3000 port!');
});
