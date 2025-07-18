/********** AJAX **********/
/*** 회원 정보 ***/
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/myPage',
    success: function(data) {
        const showData = () => {

            const userName = data.data.userName;
            const email = data.data.email;
            const nick = data.data.nickName;
            const id = data.data.userId;
            const picture = data.data.userImg;
            const backImg = data.data.backgroundImg;

            /* 배경 이미지 */
            let backImage = document.querySelector(".profileBack");

            /* 이미지 있어? 없으면 기본 넣어 */
            if (backImg == "") {
                backImage.src = "../img/Default_profileBack.png";
            } else {
                backImage.src = backImage;
            }

            /* 프로필 이미지 */
            let img = document.querySelector(".profile");

            /* 이미지 있어? 없으면 기본 넣어 */
            if (picture == "") {
                img.src = "../img/Default_Profile.png";
            } else {
                img.src = picture;
            }

            /* 이름 */
            var input_name = document.querySelector(".input_name");
            input_name.innerHTML = userName;

            var input_email = document.querySelector(".input_email");
            input_email.innerHTML = email;

            var input_nickName = document.querySelector(".input_nick");
            input_nickName.setAttribute("value", nick)

            var input_id = document.querySelector(".input_id");
            input_id.setAttribute("value", id)
        }
        showData();
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});

var backChange = 0; // 삭제 0 수정 1
/*** 정보 수정 ***/
/* 배경 이미지 */
$('#profileBack').on('click', function() {

    backChange = 0;
    var selection = prompt("이미지 수정하시려면 '1', 삭제하시려면 '2'를 입력하세요.");

    if (selection == 1) {
        backChange = 1;
        $('#back_input').click();
    } else if (selection == 2) {
        backChange = 0;
        let img = document.querySelector(".profileBack");
        img.src = "../img/Default_profileBack.png";
    }
});

$('#back_input').on('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profileBack').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
})

var pictureChange = 0; // 삭제 0 수정 1
/* 프로필 이미지 */
$('#modify').on('click', function() {

    pictureChange = 0;
    var selection = prompt("이미지 수정하시려면 '1', 삭제하시려면 '2'를 입력하세요.");

    if (selection == 1) {
        pictureChange = 1;
        $('#picture_input').click();
    } else if (selection == 2) {
        pictureChange = 0;
        let img = document.querySelector(".profile");
        img.src = "../img/Default_Profile.png";
    }
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
    console.log($('#input_pw').val());
    console.log($('#input_id').val());
    console.log($('#input_nick').val());
    var updatedDate = {
        "password": $('#input_pw').val(),
        "userLoginId": $('#input_id').val(),
        "nickName": $('#input_nick').val()
    }
    sendUpdateRequest(updatedDate);
}

const sendUpdateRequest = (updatedDate) => {
    $.ajax({
        type: 'PUT',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/myPage',
        contentType: 'application/json',
        data: JSON.stringify(updatedDate),
        success: function() {
            // //alert('통신 성공시에만 실행');
            console.log("성공");
        },
        error: function(request, status, error) {
            console.log("code: " + request.status)
            console.log("message: " + request.responseText)
            console.log("error: " + error);
        }
    });
}


////////////////////


// 이미지 넣는 ver
// var pw = "";
// $.ajax({
//     type: 'GET',
//     url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/myPage',
//     success: function(data) {
//         const showData = () => {

//             const userName = data.data.userName;
//             const email = data.data.email;
//             const nick = data.data.nickName;
//             const id = data.data.id;
//             pw = data.data.password;
//             const picture = data.data.userImg;
//             const backImg = data.data.backgroundImg;

//             /* 배경 이미지 */
//             let backImage = document.querySelector(".profileBack");

//             /* 이미지 있어? 없으면 기본 넣어 */
//             if (backImg == "") {
//                 backImage.src = "../img/Default_profileBack.png";
//             } else {
//                 backImage.src = backImage;
//             }

//             /* 프로필 이미지 */
//             let img = document.querySelector(".profile");

//             /* 이미지 있어? 없으면 기본 넣어 */
//             if (picture == "") {
//                 img.src = "../img/Default_Profile.png";
//             } else {
//                 img.src = picture;
//             }

//             /* 이름 */
//             var input_name = document.querySelector(".input_name");
//             input_name.innerHTML = userName;

//             var input_email = document.querySelector(".input_email");
//             input_email.innerHTML = email;

//             var input_nickName = document.querySelector(".input_nick");
//             input_nickName.setAttribute("value", nick)

//             var input_id = document.querySelector(".input_id");
//             input_id.setAttribute("value", id)
//         }
//         showData();
//     },
//     error: function() {
//         // //alert('통신 실패시에만 실행');
//         console.log("왜 실패?");
//     }
// });

// var backChange = 0; // 삭제 0 수정 1
// /*** 정보 수정 ***/
// /* 배경 이미지 */
// $('#profileBack').on('click', function() {

//     backChange = 0;
//     var selection = prompt("이미지 수정하시려면 '1', 삭제하시려면 '2'를 입력하세요.");

//     if (selection == 1) {
//         backChange = 1;
//         $('#back_input').click();
//     } else if (selection == 2) {
//         backChange = 0;
//         let img = document.querySelector(".profileBack");
//         img.src = "../img/Default_profileBack.png";
//     }
// });

// $('#back_input').on('change', function() {
//     var file = this.files[0];
//     if (file) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             $('#profileBack').attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
// })

// var pictureChange = 0; // 삭제 0 수정 1
// /* 프로필 이미지 */
// $('#modify').on('click', function() {

//     pictureChange = 0;
//     var selection = prompt("이미지 수정하시려면 '1', 삭제하시려면 '2'를 입력하세요.");

//     if (selection == 1) {
//         pictureChange = 1;
//         $('#picture_input').click();
//     } else if (selection == 2) {
//         pictureChange = 0;
//         let img = document.querySelector(".profile");
//         img.src = "../img/Default_Profile.png";
//     }
// });

// $('#picture_input').on('change', function() {
//     var file = this.files[0];
//     if (file) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             $('#picture').attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
// })

// const submit = () => {
//     /* 배경 */
//     var backPictureFile = "";

//     if (backChange == 0) {
//         backPictureFile = "../img/Default_profileBack.png";
//     } else if (backChange == 1) {
//         backPictureFile = $('#back_input')[0].files[0];
//     }

//     /* 프로필 */
//     var profilePictureFile = "";

//     if (pictureChange == 0) {
//         profilePictureFile = "../img/Default_Profile.png";
//     } else if (pictureChange == 1) {
//         profilePictureFile = $('#picture_input')[0].files[0];
//     }

//     var modify_pw = "";
//     if (input_pw.value == "") {
//         modify_pw = pw;
//     } else {
//         modify_pw = $('input_pw.value').val();
//     }

//     var updatedDate = {
//         "userPw": modify_pw,
//         "userLoginId": $('input_id.value').val(),
//         "userImg": profilePictureFile,
//         "backgroundImg": backPictureFile,
//         "nickName": $('input_nick.value').val()
//     }
//     sendUpdateRequest(updatedDate);
// }

// const sendUpdateRequest = (updatedDate) => {
//     $.ajax({
//         type: 'PUT',
//         url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/myPage',
//         contentType: 'application/json',
//         data: JSON.stringify(updatedDate),
//         success: function() {
//             // //alert('통신 성공시에만 실행');
//             console.log("성공");
//         },
//         error: function(request, status, error) {
//             console.log("code: " + request.status)
//             console.log("message: " + request.responseText)
//             console.log("error: " + error);
//         }
//     });
// }