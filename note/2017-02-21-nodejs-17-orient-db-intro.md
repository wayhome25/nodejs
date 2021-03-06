---
layout: post
title: Orientdb 소개 및 기본 사용법
category: nodejs
tags: [nodejs, Express, database, db, Orientdb]
comments: true
---
# Orientdb 소개 및 기본 사용법
> [생활코딩 Node.js 강의](https://opentutorials.org/module/2026/11980)      
>  데이터베이스를 이용해서 웹에플리케이션을 제작하는 방법을 알아봅니다.

## orientdb 설치
- orientdb 특징 [참고](http://orientdb.com/multi-model_database/)
  - 높은 퍼포먼스 (초당 40만행 저장)
  - 테이블 대신 클래스라는 표현을 사용
    - 구조의 재사용성을 추구
    - 유사한 성격의 테이블이 많아지는 프로젝트에서 장점이 있음
    - 기타 등등..
- orientdb 설치 [참고](http://orientdb.com/docs/last/Tutorial-Installation.html)
  - orientdb는 자바로 만들어졌기 때문에 우선 [자바 설치(JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)가 필요함
  - orientdb [다운로드](http://orientdb.com/download/)
  - 터미널을 통해 다운로드 받은 파일에 접근
  ```
  $ cd orientdb-community-2.2.17/
  $ cd bin
  $ sudo ./server.sh
  // 비밀번호 입력 후 저장
  ```
  - `비밀번호 변경 법` config/orientdb-server-config.xml 파일을 열어서 password 필드를 수정
  -  ctrl+c 눌러 orientdb 종료
- orientdb 관리 사이트 접속
  - 터미널에서  `$ sudo ./server.sh` 를 통해 실행하였을 때, `Listening http connections on 0.0.0.0:2480` 부분을 확인.
  - `http://localhost:2480/` 에 접속하여 db 관리 사이트 접속
  - new db를 선택하여 id(root)와 password를 입력 (로그인 정보는 orientdb-server-config.xml 파일에서 확인 가능)
  - 준비 완료!

## orientdb 기본 사용법
> orientdb의 클래스는 관계형 데이터베이스에서 말하는 테이블과 같은 것

- 클래스를 만든다는 것은 데이터의 구조를 정의한다는 것
- 구조를 정의한다는 표현은 엑셀에서 컬럼을 정의하는 것에 해당 (스키마)

### orientdb 클래스 column(열) 추가
- db 관리 사이트 http://localhost:2480/ 에 접속하여 클래스 추가
- 메뉴 경로 : 스키마 > New Class > `New property` (테이블의 컬럼에 해당)
- 스키마 풀 :컬럼을 구조화 시키고 데이터를 추가
- 스키마 레스 : 컬럼의 구조화 없이 데이터를 추가
- 스키마 믹스 : 어떤 컬럼은 스키마를 지키고 어떤 것은 스키마 없이 사용하는 것  

### orientdb 클래스 row(행) 추가
- New Record 을 선택하여 행을 추가
- Actions > new 를 선택하여 새로운 행을 추가할 수 있음
- Add field 를 통해서 해당 행에 대해서만 새로운 컬럼을 추가할 수 있음
- Browse 메뉴를 통해서 입력한 정보를 관리자 환경에서 가져올 수 있음
  - 일반적으로 NoSQL은 SQL 문을 제공하지 않으나 orientdb는 SQL 문을 제공
  - ex) `SELECT * FROM topic` 을 입력하여 모든 데이터를 표시

### GratefulDeadConcerts
- GratefulDeadConcerts는 orientdb에서 제공하는 샘플 데이터
- 로그아웃 후, GratefulDeadConcerts를 선택하고 ID,PW를 입력하여 재접속
- Graph 메뉴를 선택후 `SELECT FROM V` 를 입력하면 관계그래프 샘플을 조회 가능
- 관계형 데이터베이스에서는 데이터간의 관계를 JOIN 방식을 통해서 처리했으나,    
  orientdb 에서는 그것보다 더 복잡하고 다양한 방식으로 관계성을 부여할 수 있음

## orientjs 설정
### orientjs 설치
- JS를 사용하여 orientdb를 제어하려면 별도의 SDK가 필요하다.
- [orientjs 가이드 문서](https://github.com/orientechnologies/orientjs)
- 터미널에서 `npm install orientjs --save`를 입력하여 프로젝트 폴더 내에 orientjs 설치  
- 프로젝트 폴더 내에 `database_orientdb.js` 파일 생성
- 앱을 제작하기 앞서서 위 파일은 orientjs라는 도구를 이용해서 JS로 orientdb에 데이터를 추가하는 등의 기본적인 작업들을 간단하게 연습한다.

### 서버 API 초기화
> In order to use the OrientDB with your Node.js application, you first need to initialize the Server API.

- [orientjs 가이드 문서](http://orientdb.com/docs/last/OrientJS-Server.html)

- 서버 API 초기화 코드 (database_orientdb.js)
```javascript
var OrientDB = require('orientjs'); // orientjs 모듈을 도입

var server = OrientDB({ // orientDB 함수를 통해서 서버 정보를 리턴하여 인스턴스 작성
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '111111'
});
```

### 데이터베이스 API 초기화
> In order to work with an OrientDB database in your Node.js application, you need to initialize an instance of the Database API.

- 데이터베이스 API 초기화 코드 (database_orientdb.js)
```javascript
var db = server.use('o2'); // o2라는 데이터베이스를 가져옴
```

### Record API
> 특정 db에서 특정 record(행)를 가져온다.

- `record`는 하나의 행을 의미
`SELECT FROM topic` sql 문을 통해서 모든 행을 조회
- orientdb에서는 @rid 라고 하는 식별자를 기본적으로 부여함 (관계형 데이터처럼 id를 일부러 부여할 필요가 없음)
- 관계형 데이터베이스에서는 일반적으로 primary key라는 것을 지정해서 특정 행의 id 값을 주고 auto increment 를 사용함
```javascript
var rec = db.record.get('#33:0'); // 원하는 행의 @rid 값으로 교체
```

## orientdb - SELECT

## orientdb - INSERT & UPDATE & DELETE
