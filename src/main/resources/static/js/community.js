var postsByPostID = {};

// 메인 API 만들어지면 JSON으로 처리
$(document).ready(function() {
  $("#wrap_search_country").change(function() {
    var nationId = $(this).val();
    localStorage.setItem('nationId', nationId);
    if (nationId !== "") {
      window.location.href = `http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_searchCountry.html`;
    }
  });
});


$(document).ready(function() {
  var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts';
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async:false,
    url: url,
    success: function(data) {
        // console.log("mainPage connecting");
        // console.log(data);
      
        $.each(data.data, function(index, item) {
        var createdAt = new Date(item.created_at); // "created_at" 값을 Date 객체로 변환
        var currentTime = new Date(); // 현재 시간
        var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60)); // 분 단위로 시간 차이 계산
        var timeText = timeDiff + "분 전";
        
        // timeDiff 변수에 "time" 클래스를 추가하여 원하는 대상에 적용
        var resultElement = $("<span>").text(timeText).addClass("time");

        var $postIcon = $('<div>').addClass('postIcon');
        var $userName = $('<div>').addClass('userName').text(item.userName); 
        var $postContent = $('<div>').addClass('postContent').attr('spellcheck', 'false').text(item.contents);
        

        var $views = $('<div>').addClass('views');
        
        var $likes = $('<div>').addClass('likes').text(item.like_count);
        var $likes_image = $('<img>').attr("id", `likes_image${item.post_id}`).attr("src","../img/icon _heart_.png").addClass('likes_image');


        var $comment = $('<div>').addClass('comment').text(item.comment_count);
        var $comment_image = $('<div>').addClass('comment_image');



        var $scrap = $('<div>').addClass('scrap').text("스크랩");
        var $scrap_image = $('<img>').attr("id", `scrap_image${item.post_id}`).attr("src","../img/icon _star outline_.png").addClass('scrap_image');

        var $share = $("<div>").addClass("share").attr("id", `share${item.post_id}`).text("공유");
        var $share_image = $('<div>').attr("id", `share${item.post_id}`).addClass('share_image');

        // var $report = $('<div>').attr("id", `report${item.post_id}`).addClass('report').text("신고");
        
              
        var $file_only = $('<img>').addClass('file_only').attr('src', item.imgUrl);
      
        var $delete = $('<div>').addClass("delete").attr("id", `delete${item.post_id}`).text("X");

        if (!postsByPostID[item.postId]) {
          postsByPostID[item.postId] = $('<div>').addClass('post-container');
        }

        var $postContainer = $('<div>').addClass('post-container').attr('data-postid', item.post_id);
        // ID값 다르게 주기

        $postContainer.append($postIcon, $delete, resultElement, $userName, $postContent, $file_only, $views, $likes, $likes_image, $comment, $comment_image, $scrap, $scrap_image, $share, $share_image,);//report 없임

        // wrap_community_box에 게시물 컨테이너 추가
        $('#wrap_community_box').append($postContainer);


    
  })}})
  
  $('.delete').click(function(event) {
    var id_num = event.target.id.match(/\d+/)[0];
    var postId = id_num;
    // console.log(postId);
    $(`[data-postid="${postId}"]`).remove();

  })

  
  //reply 창으로 넘기기
  $('#wrap_community_box').on('click', '.post-container', function() {
    
    var postid = $(this).data('postid');
    localStorage.setItem('postid', postid); 
    var is_clicked_post_container = localStorage.getItem('is_clicked_post_container');

    if (is_clicked_post_container === null) {
      is_clicked_post_container = '1';
    }
    
    if(is_clicked_post_container === '1'){
      is_clicked_post_container = '0';
      localStorage.setItem('is_clicked_post_container',is_clicked_post_container);
      // var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_comment.html';
      var url = '../html/community_comment.html';

      window.location.href = url;

    }else{
      is_clicked_post_container = '1';
      localStorage.setItem('is_clicked_post_container',is_clicked_post_container);

    }

  });
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


    // 좋아요
    let is_clicked_likes = false;

    $('.likes_image').click(function(event) {
      var id_num = event.target.id.match(/\d+/)[0];
      var postId = id_num;
      // console.log(postId); // 이따 체크
      
      event.stopPropagation();

      if(!is_clicked_likes){
        $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_red.png");
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
          // console.log("like connecting");
          
          }
      });
    });

    //스크랩
    let is_clicked_scrap = false;
      
    $('.scrap_image').click(function(event){
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
        success: function(data) {
            // console.log("scrap connecting");
          }})
    });

  // 공유
  let is_clicked_share = false;
  
  $(".share").click(function (event) {

    var id_num = event.target.id.match(/\d+/)[0];
    event.stopPropagation();

    

    if (!is_clicked_share) {
      var $share_image_instagram = $("<img>").attr("src","../img/instagram.png");
      var $share_image_facebook = $("<img>").attr("src", "../img/facebook.png");
      var $share_image_twitter = $("<img>").attr("src", "../img/twitter.png");
      var $share_image_kakao = $("<img>").attr("src", "../img/kakao.png");
      var $share_image_Vector = $("<img>").addClass("Vector").attr("src", "../img/Vector.png");
      var $share_link = $("<div>").addClass("share_link").text(`http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${id_num}/share`);

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

  $(".share_copy").click(function (event) {
    var id_num = event.target.id.match(/\d+/)[0];
    event.stopPropagation();
    url=`http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${id_num}/share`;
    localStorage.setItem('url',url);
  });

  $(".share_image").click(function (event) {
    var id_num = event.target.id.match(/\d+/)[0];
    event.stopPropagation();
    $(`#share${id_num}`).click();
  });


  $(document).ready(function() {
    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/nation';
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {
        
        for (var i = 0; i < data.data.length; i++) {
          var nationId = data.data[i].nationId;
          var nationName = data.data[i].nationName;
          
          // console.log("nationId:", nationId);
          // console.log("nationName:", nationName);
          
          // <select> 요소에 옵션 추가
          var $select = $('#wrap_search_country');
          var $option = $("<option>").attr("value", nationId).text(nationName);
          $select.append($option);
        }

  
      }})
    })
  
});
