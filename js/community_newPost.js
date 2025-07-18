function getImageFiles(e) {
    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector(".image-preview");
    const docFrag = new DocumentFragment();
  
    if (imagePreview.childElementCount >= 1) {
        alert("이미지는 최대 1개 까지 업로드가 가능합니다.");
        return;
      }

    if ([...files].length >= 2) {
      alert("이미지는 최대 1개 까지 업로드가 가능합니다.");
      return;
    }
  
    // 파일 타입 검사
    [...files].forEach((file) => {
      if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드가 가능합니다.");
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
  

  $('#wrap_newPost_country').keyup(function(event) {
    if (event.key === 'Enter') {
      var url = 'http://127.0.0.1:5500/html/community_searchCountry.html';
  
      window.location.href = url;
    }});

  // 값 백엔드로 보내기
  
  $(document).ready(function() {
    var title = "제목";
    var content = "내용";
  
    var data = {
      title: title,
      content: content
    };
  
    var url = '/api/post/{countryCode}';
  
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data),
      success: function(response) {
        console.log(response);
      },
    });
  });




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