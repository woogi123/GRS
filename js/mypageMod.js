/*** 회원 정보 ***/
var jsonLocation = "../json/userInfor.json";
$.getJSON(jsonLocation, function(data) {

    const showData = () => {

        const userName = data.data.userName;
        const email = data.data.email;
        const nick = data.data.nickName;
        const id = data.data.userId;
        const pw = data.data.userPw;
        const picture = data.data.picture;

        let wrap_infor = document.querySelector(".wrap_infor");

        /* 이미지 */
        // let img = document.createElement("img");
        // img.src = picture;

        /* 이름 */
        var input_name = document.querySelector(".input_name");
        input_name.innerHTML = userName;

        var input_email = document.querySelector(".input_email");
        input_email.innerHTML = email;

        var input_nickName = document.querySelector(".input_nick");
        input_nickName.setAttribute("value", nick)

        var input_id = document.querySelector(".input_id");
        input_id.setAttribute("value", id)

        var input_pw = document.querySelector(".input_pw");
        input_pw.setAttribute("value", pw)

        // wrap_infor.appendChild(img); // 없어서 보류
    }
    showData();
});

$('#modify').on('click', function() {
    $('#picture_input').click();
});

$('#picture_input').on('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#picture').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
})

const submit = () => {
    var profilePictureFile = $('#picture_input')[0].files[0];

    var updatedDate = {
        "userPw": $('input_id.value').val(),
        "userId": $('input_pw.value').val(),
        "picture": profilePictureFile,
        "nickName": $('input_nick.value').val()
    }
    sendUpdateRequest(updatedDate);
}

const sendUpdateRequest = (updatedDate) => {
    $.ajax({
        type: 'PUT',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/mypage',
        contentType: 'application/json',
        data: JSON.stringify(updatedDate),
        success: function() {
            alert('통신 성공시에만 실행');
            console.log("성공");
        },
        error: function(request, status, error) {
            console.log("code: " + request.status)
            console.log("message: " + request.responseText)
            console.log("error: " + error);
        }
    });
}