var _ = require('underscore'); // underscore 모듈을 가져와서 객체를 리턴한다.
var arr = [3, 5, 9, 1, 12];

console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]);
console.log(_.last(arr));
