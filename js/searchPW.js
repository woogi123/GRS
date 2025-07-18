
  
  function onSubmitsearchPw(){
    // var userLoginId = $('#userId').val();
    var email =$('#email').val();
    if(email.trim()==""){
      alert("입력되지 않은 항목 존재");
      return false;
    }
    $.ajax({
        type: 'POST',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/user/findPw',
        contentType: 'application/json',
        data: JSON.stringify({
          // 'userId':userId,
          'email':email,
        }),
        success : function(data){
          alert("이메일로 임시 비밀번호를 전송했습니다.")
        },
        error: function(request, status, error){
          console.error(error);
          alert("이메일 오류");
        }
    })
  }
