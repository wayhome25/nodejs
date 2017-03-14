var OrientDB = require('orientjs'); // orientjs 모듈을 도입

var server = OrientDB({ // orientDB 함수를 통해서 서버 정보를 리턴하여 인스턴스 작성
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '111111'
});
var db = server.use('o2'); // o2라는 데이터베이스를 가져옴
var rec = db.record.get('#33:0'); // o2 db내의 @rid 값 #1:1에 해당하는 행(record)를 가져옴
rec.then(function(record){
  console.log('Loaded record: ', record);
});
