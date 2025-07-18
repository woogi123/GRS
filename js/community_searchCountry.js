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


// 메인 API 만들어지면 JSON으로 처리
$(document).ready(function() {
  $("#wrap_search_country").change(function() {
    var nationId = $(this).val();
    localStorage.setItem('nationId', nationId);
    if (nationId !== "") {
      window.location.href = 'http://127.0.0.1:5500/html/community_searchCountry.html';
    }
  });
});


  

$(document).ready(function() {
  var nationId = localStorage.getItem('nationId');
  console.log("nationId",nationId);

  if (nationId) {
    var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${nationId}`;
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {
        console.log('hi');  //아직 안나온듯? 이따 이어서
        console.log(data);

          var createdAt = new Date(data.created_at);
          var currentTime = new Date();
          var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60));
          var timeText = timeDiff + "분 전";
          
          var resultElement = $("<span>").text(timeText).addClass("time");
      
      
          var $postIcon = $('<div>').addClass('postIcon');
          var $postId = $('<div>').addClass('postId').text(data.userName);
      
          var $postContent = $('<textarea>').addClass('postContent').attr('spellcheck', 'false').text(data.content);
          // title 말고 userName이 들어가는게 맞나?
      
          var $views = $('<div>').addClass('views');
          var $likes = $('<div>').addClass('likes').text(data.like);
          var $likes_image = $('<div>').addClass('likes_image');
      
          var $comment = $('<div>').addClass('comment').text(data.comment);
          var $comment_image = $('<div>').addClass('comment_image');
      
      
      
          var $scrap = $('<div>').addClass('scrap').text("스크랩");
          var $scrap_image = $('<div>').addClass('scrap_image');
      
          var $share = $('<div>').addClass('share').text("공유");
          var $share_image = $('<div>').addClass('share_image');
          var $report = $('<div>').addClass('report').text("신고");
          
      
          var $file_only = $('<div>').addClass('file_only').text(data.file1);
      

          $('#wrap_community').append($postIcon).append(resultElement).append($postId).append($postContent).append($file_only).append($views).append($likes).append($likes_image).append($comment).append($comment_image).append($scrap).append($scrap_image).append($share).append($share_image).append($report).trigger("create");

           }});
    }
  });

      