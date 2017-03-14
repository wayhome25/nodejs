var express = require('express'); // express모듈 적용
var bodyParser = require('body-parser'); // body-parser 미들웨어 설정
var fs = require('fs'); // file system nodejs 모듈 적용 (텍스트파일 업로드)
var multer = require('multer'); // multer모듈 적용 (파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
var app = express();
app.use('/users',express.static('uploads'));


app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('view engine', 'jade'); // 템플릿 엔진 설정
app.set('views', './views_file');

//////////////// 라우터 시작 ////////////////

// 업로드 - 파일 업로드 폼
app.get('/upload', function(req, res){
  res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded! : '+req.file.filename); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

// 작성 - 글 작성후 post로 전송
app.get('/topic/new', function(req, res){
  fs.readdir('data',function(err, files) {
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      res.render('new',{topics: files});
    }
  });
});

// 저장 - post로 전송된 글 저장
app.post('/topic', function(req, res) {

  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      // 에러정보가 터미널에 표시된다.
      res.status(500).send('Internal Server Error');
      // send 메소드는, send가 실행되면 그 다음코드는 실행되지 않는다.
    }
    res.redirect('/topic/'+title);
    // callback 함수가 실행된 후에 response가 가능하다.
  });
});

// 조회 - 글목록 표시, 글내용
app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('data',function(err, files) {
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      // id 값이 있을 떄
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics: files, title: id, description: data});
      });
    }else{
      // id 값이 없을 때
      res.render('view', {topics:files, title:'welcome', description:'hello JS for server'});
    }
  });
});

//////////////// 라우터 종료 ////////////////

// express 서버를 특정 포트에 연결
app.listen(3000, function() {
  console.log('connected, 3000 port!');
});
