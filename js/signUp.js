function onSubmitSignup(){
    var userLoginId = $('#userId').val();
    var password = $("#password").val();
    var email = $("#email").val();
    var userName = $("#userName").val();
    var nickName = $("#nickName").val();
    var birthDay = $("#birthDay").val();
    if(userLoginId.trim()==" " || password.trim()==" " || email.trim()==" " || nickName.trim()==""||userName.trim()==""||birthDay.trim()==""){
      alert("입력되지 않은 항목 존재");
      return false;
    }
    if($('#check').is(':checked')==false){
      alert("인증 동의 필요");
      return false;
    }


    $.ajax({
      type: "POST",
      url: "http://grishare.ap-northeast-2.elasticbeanstalk.com/api/user/register",
      contentType: "application/json",
      data: JSON.stringify({
        userLoginId: userLoginId,
        password: password,
        email: email,
        userName: userName,
        nickName: nickName,
        birthDay: birthDay,
      }),
      success: function (data) {
        alert("통신 성공시에만 실행");
        console.log("성공");
        console.log(data);
      },
      error: function (request, status, error) {
        alert(
          "code:" +
            request.status +
            "\n" +
            "message:" +
            request.responseText +
            "\n" +
            "error:" +
            error
        );
      },
    });
}

      
