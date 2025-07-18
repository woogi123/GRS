
  // 네비바 이동
  $('.a-community').click(function() {
    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community.html';
    window.location.href = url;
});
  $('.a-exchange').click(function() {
    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/exchangeRate.html';
    window.location.href = url;
});
  $('.a-price').click(function() {
    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/pricecomparison.html';
    window.location.href = url;
});
  $('.a-customer').click(function() {
    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/고객지원.html';
    window.location.href = url;
});

var postId = localStorage.getItem('postid');

$(document).ready(function() {
    var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}`;
    // console.log(url);
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {
          // console.log("reply connecting");
          // console.log(data);
        
          var createdAt = new Date(data.data.created_at);
          var currentTime = new Date();
          var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60));
          var timeText = timeDiff + "분 전";
          
          var resultElement = $("<span>").text(timeText).addClass("time_comment");


          var $postIcon = $('<div>').addClass('postIcon_comment');
          var $userName = $('<div>').addClass('userName_comment').text(data.data.userName);
          var $postContent = $('<div>').addClass('postContent').attr('spellcheck', 'false').text(data.data.contents);
          
      
          var $views = $('<div>').addClass('views');

          var $likes = $('<div>').addClass('likes').text(data.data.like_count);
          var $likes_image = $('<img>').attr("id", `likes_image${data.data.post_id}`).attr("src","../img/icon _heart_.png").addClass('likes_image');
  
      
          var $comments_count = $('<div>').addClass('comment').text(data.data.comments_count);
          
      
      
          var $scrap = $('<div>').addClass('scrap_comment').text("스크랩");
          var $scrap_image = $('<img>').attr("id", `scrap_image${data.data.post_id}`).attr("src","../img/icon _star outline_.png").addClass('scrap_image_comment');

          var $share = $("<div>").addClass("share_comment").attr("id", `share${data.data.post_id}`).text("공유");
          var $share_image = $('<div>').attr("id", `share${data.data.post_id}`).addClass('share_image_comment');

          var $report = $('<div>').attr("id", `report${data.data.post_id}`).addClass('report').text("신고");
        
      
          var $file_only = $('<img>').addClass('file_only').attr('src', data.data.imgUrl);
      

          $('#wrap_community_box_comment').append(resultElement).append($userName).append($postIcon).append($postContent).append($file_only).append($views).append($likes).append($likes_image).append($scrap).append($scrap_image).append($share).append($share_image).append($report).trigger("create");
          
          var $comment_box = $('<div>').addClass('comment_box');
          var $comment_post = $('<input>').addClass('comment_post_comment').attr('placeholder', '댓글을 작성해 주세요.');
          var $comment_commit = $('<div>').addClass('comment_commit').text('등록');

          $('#wrap_comment_box').append($comment_box);
          $comment_box.append($comment_post);
          $comment_box.append($comment_commit);

          $.each(data.data.comment, function(index, item) {
            // console.log(item);
            var $comment_userIcon = $('<div>').addClass('comment_userIcon');
            var $comment_userbox = $('<div>').addClass('comment_userbox');

            var $userName = $('<div>').addClass('comment_userName').text(item.userName);
            var $comment_contents = $('<div>').addClass('comment_contents').text(item.contents);

            $comment_userbox.append($userName).append($comment_contents).append($comment_userIcon);
            $('#wrap_comment_box').append($comment_userbox);
          });

          $(document).ready(function() {
            $('input').on('mousedown', function() {
              $(this).css('outline', 'none');
            });
          });



          //신고
          let is_clicked_report = false;

          $('.report').click(function(event) {
            
            var id_num = event.target.id.match(/\d+/)[0];
            var postId = id_num;
            event.stopPropagation();
          
            if (!is_clicked_report) {
              // var $overlay = $('<div>').addClass('overlay');
              // $('body').append($overlay);
              
              var $report_click = $('<div>').addClass('report_click').text("신고하기");
          
              $(`#report${id_num}`).append($report_click);
              is_clicked_report = true;

            } else {
              $(`#report${id_num}`).find('.report_click').remove();
              // $('.overlay').remove();
              is_clicked_report = false;
            }
            
            $.ajax({
              type: 'POST',
              dataType: 'json',
              url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/report`,
              success: function(data) {
                  // console.log("report connecting");
              }});

          });
          
          $(document).on('click', '.report_click', function() {
            //alert("신고되었습니다.");
            localStorage.setItem('is_clicked_report',"1");
            var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_comment.html';
          
            window.location.href = url;
          });
              

          // 좋아요
          let is_clicked_likes = false;

          $('.likes_image').click(function(event) {
            var id_num = event.target.id.match(/\d+/)[0];
            var postId = id_num;
            // console.log(postId); // 이따 체크
            
            event.stopPropagation();

            if(!is_clicked_likes){
              $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_red.png");
              
              // 일단 like가 오르게?

              is_clicked_likes = true;
            }else{
              $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_.png");
              is_clicked_likes = false;
            }

            $.ajax({
            type: 'POST',
            dataType: 'json',
            url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/like`,
            success: function(data) {
                // console.log("like connecting"); //이부분 필요한건가?
                
                }
            });
          });

          //스크랩
          let is_clicked_scrap = false;
            
          $('.scrap_image_comment').click(function(event){
            var id_num = event.target.id.match(/\d+/)[0];
            var postId = id_num;
            event.stopPropagation();

            if(!is_clicked_scrap){
              $(`#scrap_image${id_num}`).attr("src", "../img/icon _yellow_star outline_.png");
              is_clicked_scrap = true;
            }else{
              $(`#scrap_image${id_num}`).attr("src", "../img/icon _star outline_.png");
              is_clicked_scrap = false;
            }

            $.ajax({
              type: 'POST',
              dataType: 'json',
              url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/scrap`,
              data : { json: JSON.stringify( jsonData ) },
              success: function(data) {
                  // console.log("scrap connecting");
                }})
          });


          // 공유
          let is_clicked_share = false;

          $(".share_comment").click(function (event) {
            
            var id_num = event.target.id.match(/\d+/)[0];
            
            event.stopPropagation();

            if (!is_clicked_share) {
              var $share_image_instagram = $("<img>").attr("src","../img/instagram.png");
              var $share_image_facebook = $("<img>").attr("src", "../img/facebook.png");
              var $share_image_twitter = $("<img>").attr("src", "../img/twitter.png");
              var $share_image_kakao = $("<img>").attr("src", "../img/kakao.png");
              var $share_image_Vector = $("<img>").addClass("Vector").attr("src", "../img/Vector.png");
              var $share_link = $("<div>").addClass("share_link")
              // 링크 추가
              var $share_click = $("<div>").addClass("share_click");
              var $share_copy = $("<div>").addClass("share_copy").text("복사");
              var $share_emoji_box = $("<div>").addClass("share_emoji_box");
              $(`#share${id_num}`).append($share_click);
              $(".share_click").append($share_link);

              $(".share_link").append($share_copy);
              $(`#share${id_num}`).append($share_emoji_box);
              $(".share_emoji_box").append($share_image_instagram);
              $(".share_emoji_box").append($share_image_kakao);
              $(".share_emoji_box").append($share_image_twitter);
              $(".share_emoji_box").append($share_image_facebook);
              $(".share_emoji_box").append($share_image_Vector);
              is_clicked_share = true;
              // var $overlay = $('<div>').addClass('overlay');
              // $('body').append($overlay);

            } else {
              $(".share_click").remove();
              $(".share_emoji_box").remove();
              $(".share_link").remove();
              // $('.overlay').remove();
              is_clicked_share = false;
            }
          });
          $(".share_image").click(function (event) {
            var id_num = event.target.id.match(/\d+/)[0];
            event.stopPropagation();
            $(`#share${id_num}`).click();
          });
          
          //여기
          $(".share_copy").click(function (event) {
            var id_num = event.target.id.match(/\d+/)[0];
            event.stopPropagation();
            url=`http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${id_num}/share`;
            localStorage.setItem('url',url);
          });
    $(".comment_commit").click(function() {
      var comment_post_comment = $('.comment_post_comment').val();
      
      // console.log(comment_post_comment);  //여기 해보기

      if (comment_post_comment === ""){
          //alert("내용을 입력해 주세요.");
          var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_comment.html';
          window.location.href = url;
      } else {
        postId = localStorage.getItem("postid");

        var commentData = {
          content: comment_post_comment
        };

        $(document).ready(function() {

          var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/comment`;
          
          $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(commentData),
            success: function(response){
              // console.log(response);
            },
          }); 
        })}
      });

           },error: function() {
            // //alert('통신 실패시에만 실행');
            // console.log("왜 실패?");
        }
          
          });
    }
  
  );

  

