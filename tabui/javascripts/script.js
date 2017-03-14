
$('#about').click(function(){
  $.ajax({
      url:"http://jsonplaceholder.typicode.com/posts/1",
      dataType:"json",
      success: function(data) {
        var str = '';
        for (var name in data){
          if(name === "title"){
            str += '<h1>' + data[name] + '</h1>';
          }else if(name === 'body'){
            str += '<p>'+ data[name] +'</p>';
          }
        }
        $('.description').html(str);
      }
  });
})
