


function onSubmitLogin(){
  var userLoginId = $('#userId').val();
  var password =$('#userPw').val();
  if(userLoginId.trim()==" "||password.trim()==" "){
    alert("입력되지 않은 항목 존재");
    return false;
  }
  $.ajax({
    type: "POST",
    url: "http://grishare.ap-northeast-2.elasticbeanstalk.com/api/user/login",
    contentType: "application/json",
  
    data: JSON.stringify({
      userLoginId:userLoginId ,
      password: password,
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
