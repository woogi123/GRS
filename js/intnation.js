// $.ajax({
//     type: 'GET',
//     url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/country',
//     success: function() {
//         alert('통신 성공시에만 실행');
//         console.log("성공");
//     },
//     error: function() {
//         alert('통신 실패시에만 실행');
//         console.log("왜 실패?");
//     }
// });

$.getJSON("../json/intnation.json", function(data) {
    $.each(data, function(index, item) {

        var $a = $("<a>").addClass("per-intnation");

        var $countryCode = $('<div>').addClass('countryCode').text(item.countryCode)
        var $countryImg = $('<div>').addClass('countryImg')
        var $countryName = $('<div>').addClass('countryName').text(item.countryName);

        $a.append($countryName).append($countryImg)

        $a.attr("href", "../html/community_searchCountry.html");


        $a.click(function () {
            localStorage.setItem("countryCode", item.countryCode);
        });


        $('#wrap-intnation').append($a);

    })
})