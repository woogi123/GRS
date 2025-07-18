// var postId = localStorage.getItem('postid');
// console.log(postId);


// $(document).ready(function() {
//     var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}`;
//     $.ajax({
//       type: 'GET',
//       dataType: 'json',
//       url: url,
//       success: function(data) {
//           console.log("reply connecting");

//           var createdAt = new Date(data.created_at);
//           var currentTime = new Date();
//           var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60));
//           var timeText = timeDiff + "분 전";
          
//           var resultElement = $("<span>").text(timeText).addClass("time") ;
        

//           var $postId = $('<div>').addClass('postId').text(data.userName);
      
//           var $postContent = $('<textarea>').addClass('postContent').attr('spellcheck', 'false').text(data.content);
//           // title 말고 userName이 들어가는게 맞나?
      
//           var $views = $('<div>').addClass('views');
//           var $likes = $('<div>').addClass('likes').text(data.like);
//           var $likes_image = $('<div>').addClass('likes_image');
      
//           var $comment = $('<div>').addClass('comment').text(data.comment);
//           // var $comment_count = $('<div>') ~~~
      
      
//           var $scrap = $('<div>').addClass('scrap').text("스크랩");
//           var $scrap_image = $('<div>').addClass('scrap_image');
      
//           var $share = $('<div>').addClass('share').text("공유");
//           var $share_image = $('<div>').addClass('share_image');
//           var $report = $('<div>').addClass('report').text("신고");
          
      
//           var $file_only = $('<div>').addClass('file_only').text(data.file1);
      

//           $('#wrap_community').append(resultElement).append($postId).append($postContent).append($file_only).append($views).append($likes).append($likes_image).append($scrap).append($scrap_image).append($share).append($share_image).append($report).trigger("create");
          
//           var $comment_box = $('<div>').addClass('comment_box');
//           var $comment_post = $('<div>').addClass('comment_post').text('댓글을 작성해 주세요.');
//           var $comment_commit = $('<div>').addClass('comment_commit').text('등록');
//           var $comment_userbox = $('<div>').addClass('comment_userbox');

//           var $userName = $('<div>').addClass('userName').text(data.comment.userName);
//           var $comment_contents = $('<div>').addClass('comment_contents').text(data.comment.contents);



//           $('#wrap_comment_box').append($comment_box);
//           $('#wrap_comment_post').append($comment_commit);
//           $('.commentbox').append($comment_post).append($comment_userbox);
//           $('.comment_userbox').appebd($userName).append($comment_contents).text(data.comment.contents);



//            }});
//     }
//   );

  




      // 네비바 이동
      $('.a-community').click(function() {
        var url = 'http://127.0.0.1:5500/html/community.html';
        window.location.href = url;
    });
      $('.a-exchange').click(function() {
        var url = 'http://127.0.0.1:5500/html/exchangeRate.html';
        window.location.href = url;
    });
      $('.a-price').click(function() {
        var url = 'http://127.0.0.1:5500/html/pricecomparison.html';
        window.location.href = url;
    });
      $('.a-customer').click(function() {
        var url = 'http://127.0.0.1:5500/html/고객지원.html';
        window.location.href = url;
    });


    var postsByPostID = {};
    var postId = localStorage.getItem('postid');
    console.log(postId);


    $.getJSON("../json/data_comment.json", function(data) {
      $.each(data, function(index, item) {
      if (item.post_id != postId) {
        $(item).hide();
      } else {
        console.log(data);

          var createdAt = new Date(itme.created_at);
          var currentTime = new Date();
          var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60));
          var timeText = timeDiff + "분 전";
          
          var resultElement = $("<span>").text(timeText).addClass("time") ;
        

          var $postId = $('<div>').addClass('postId').text(data.userName);
      
          var $postContent = $('<textarea>').addClass('postContent').attr('spellcheck', 'false').text(data.content);
          // title 말고 userName이 들어가는게 맞나?
      
          var $views = $('<div>').addClass('views');
          var $likes = $('<div>').addClass('likes').text(data.like);
          var $likes_image = $('<div>').addClass('likes_image');
      
          var $comment = $('<div>').addClass('comment').text(data.comment);
          // var $comment_count = $('<div>') ~~~
      
      
          var $scrap = $('<div>').addClass('scrap').text("스크랩");
          var $scrap_image = $('<div>').addClass('scrap_image');
      
          var $share = $('<div>').addClass('share').text("공유");
          var $share_image = $('<div>').addClass('share_image');
          var $report = $('<div>').addClass('report').text("신고");
          
      
          var $file_only = $('<div>').addClass('file_only').text(data.file1);
      

          $('#wrap_community').append(resultElement).append($postId).append($postContent).append($file_only).append($views).append($likes).append($likes_image).append($scrap).append($scrap_image).append($share).append($share_image).append($report).trigger("create");
          
          var $comment_box = $('<div>').addClass('comment_box');
          var $comment_post = $('<div>').addClass('comment_post').text('댓글을 작성해 주세요.');
          var $comment_commit = $('<div>').addClass('comment_commit').text('등록');
          var $comment_userbox = $('<div>').addClass('comment_userbox');

          var $userName = $('<div>').addClass('userName').text(data.comment.userName);
          var $comment_contents = $('<div>').addClass('comment_contents').text(data.comment.contents);



          $('#wrap_comment_box').append($comment_box);
          $('#wrap_comment_post').append($comment_commit);
          $('.commentbox').append($comment_post).append($comment_userbox);
          $('.comment_userbox').appebd($userName).append($comment_contents).text(data.comment.contents);

    
      }
        
      });

    });