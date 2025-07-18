var uploadFiles = [];

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
        
        
        var $select = $('#wrap_newPost_country');
        var $option = $("<option>").attr("value", nationId).text(nationName);
        $select.append($option);
      }


    }})
  })

function getImageFiles(e) {
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector(".image-preview");
    const docFrag = new DocumentFragment();
  
    if (imagePreview.childElementCount >= 1) {
        //alert("이미지는 최대 1개 까지 업로드가 가능합니다.");
        return;
      }

    if ([...files].length >= 2) {
      //alert("이미지는 최대 1개 까지 업로드가 가능합니다.");
      return;
    }
  
    // 파일 타입 검사
    [...files].forEach((file) => {
      if (!file.type.match("image/.*")) {
        //alert("이미지 파일만 업로드가 가능합니다.");
        return;
      }
  
      // 파일 갯수 검사
      if ([...files].length < 2) {
        uploadFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = createElement(e, file);
          imagePreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
      
    });
    

  }


  function createElement(e, file) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.id = "post_img";
    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);
    li.appendChild(img);
  
    return li;
  }
  
  const wrap_newPost_file = document.querySelector("#wrap_newPost_file");
  const upload = document.querySelector(".upload");
  
  upload.addEventListener("click", () => wrap_newPost_file.click());
  wrap_newPost_file.addEventListener("change", getImageFiles);

//  여기부터

  $(document).ready(function() {
      $("#wrap_newPost_country").change(function() {
        var nationId = $(this).val();
        localStorage.setItem('nationId', nationId);

      });
    });

    // 값 백엔드로 보내기
    //nationId 를 작성할 때 무조건 선택하게

    $(document).ready(function() {
      $("#wrap_newPost_save").click(function() {
        var title = $('#wrap_newPost_head').val();
        var contents = $('#wrap_newPost_content').val();
        var nationId = localStorage.getItem('nationId');

    
        if (nationId === "main" || title === "" || contents === "") {
          if (nationId === "main") {
            //alert("나라를 선택해 주세요.");
          } else if (title === "") {
            //alert("제목을 입력해 주세요.");
          } else if (contents === "") {
            //alert("내용을 입력해 주세요.");
          }
          var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_post.html';
          window.location.href = url;
        } else {
          var postRequestDto = {
            title: title,
            content: contents
          };
          var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${nationId}`;
    
          $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(postRequestDto),
            contentType: 'application/json',
            success: function(response) {
              // console.log(response);
    
              // 이미지 첨부
              var imageFile = uploadFiles[0];
              var formData = new FormData();
              formData.append('file', imageFile);
    
              $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function(response) {
                  // console.log(response);
                  //alert('등록되었습니다.');
                  var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community.html';
                  window.location.href = url;
                },
              });
            },
          });
        }
      });
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



    