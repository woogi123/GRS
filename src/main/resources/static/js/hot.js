// $.getJSON("../json/hot-data.json", function(data) {
//     $.each(data , function(index, item){
//         var $a = $("<a>").addClass("wrap-hotcol");

//         var $post_id = $('<div>').addClass('post_id').text(item.post_id);
//         var $title = $('<div>').addClass('title').text(item.title);
//         var $contents = $('<div>').addClass('contents').text(item.contents);
//         var $userName = $('<div>').addClass('userName').text(item.userName);
//         var $created_at = $('<div>').addClass('created_at').text(item.created_at);
//         var $views = $('<div>').addClass('views').text(item.views);
//         var $like = $('<div>').addClass('like').text(item.like);
//         var $likes_image = $('<div>').addClass('likes_image');
        
//         // $a.append($title).append($contents).append($like).append($likes_image);

//         // $a.attr("href", "../html/community_comment.html");

//         // $a.click(function () {
//         //     localStorage.setItem("post_id", item.post_id);
//         // });

//         $('#wrap-hot-writes').append($a);

//     })

    

// })

$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/post/hotview',
    success: function(data) {
        $.each(data.data , function(index, item){
            var $a = $("<a>").addClass("wrap-hotcol");

            var $post_id = $('<div>').addClass('post_id').text(item.post_id);
            var $title = $('<div>').addClass('title').text(item.title);
            var $contents = $('<div>').addClass('contents').text(item.contents);
            var $like = $('<div>').addClass('like').text(item.like);
            var $likes_image = $('<div>').addClass('likes_image');
            $a.append($title).append($contents).append($like).append($likes_image);

            $a.attr("href", "../html/community_comment.html");

             $a.click(function () {
                 localStorage.setItem("post_id", item.post_id);
             });
    
            $('#wrap-hot-writes').append($a);
    
        })
    },
    error: function() {
        //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});
