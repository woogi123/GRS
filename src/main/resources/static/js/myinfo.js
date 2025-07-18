$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/mypage',
    success: function(data) {
        

            var $userName = $('<div>').addClass('userName').text(data.data.userName)
            var $email = $('<div>').addClass('email').text(data.data.email)
            var $picture = $('<div>').addClass('picture').text(data.data.picture)
            var $nickName = $('<div>').addClass('nickName').text(data.data.nickName)

            $('#wrap-myid').append($userName).append($email).append($picture).append($nickName)
        
    },
    error: function() {
        console.log("실패");
    }
});