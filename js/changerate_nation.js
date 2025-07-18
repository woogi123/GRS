// $.getJSON("../json/changerate_nation.json", function (data) {
//     $.each(data, function (index, item) {
//       var $div = $("<div>").addClass("wrap");
//       var $countryName = $("<div>")
//         .addClass("countryName")
//         .text(item.countryName);
//       var $exchangeRate = $("<div>")
//         .addClass("exchangeRate")
//         .text(item.exchangeRate);
//       $div.append($countryName).append($exchangeRate);
//       $("#today-exchangeRate").append($div);
//     });
//   });


  $.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate',
    success: function(data) {
      $.each(data, function (index, item) {
        console.log(item.contryName)
        var $div = $("<div>").addClass("wrap");
        var $contryName = $("<div>")
          .addClass("contryName")
          .text(item.contryName);
        var $exchangeRate = $("<div>")
          .addClass("exchangeRate")
          .text(item.exchangeRate);
        $div.append($contryName).append($exchangeRate);
        $("#today-exchangeRate").append($div);
      });
        alert('통신 성공시에만 실행');
        console.log("성공");
    },
    error: function() {
        alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});