
  function onSubmitsearchId(){
    var email =$('#email').val();
    $.ajax({
        type: 'POST',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/user/findId',
        contentType: 'application/json',
        data: JSON.stringify({
          'email':email,
        }),
        success : function(data){
          alert("이메일로 아이디를 전송했습니다.")
        },
        error: function(request, status, error){
          console.error(error);
          alert("이메일 오류");
        }
    })
  }
  