$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/nation/like',
    success: function(data) {
        $.each(data.data, function (index, item) {

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
        });
    },
    error: function() {
        console.log("실패");
    }
});

// $.each(data, function(index, item) {

//     var $a = $("<a>").addClass("per-intnation");

//     var $countryCode = $('<div>').addClass('countryCode').text(item.countryCode)
//     var $countryImg = $('<div>').addClass('countryImg')
//     var $countryName = $('<div>').addClass('countryName').text(item.countryName);

//     $a.append($countryName).append($countryImg)

//     $a.attr("href", "../html/community_searchCountry.html");


//     $a.click(function () {
//         localStorage.setItem("countryCode", item.countryCode);
//     });


//     $('#wrap-intnation').append($a);

// //alert('통신 성공시에만 실행');
// console.log("성공");

// $.getJSON("../json/intnation.json", function(data) {
//     $.each(data, function(index, item) {

//         var $a = $("<a>").addClass("per-intnation");

//         var $countryCode = $('<div>').addClass('countryCode').text(item.countryCode)
//         var $countryImg = $('<div>').addClass('countryImg')
//         var $countryName = $('<div>').addClass('countryName').text(item.countryName);

//         $a.append($countryName).append($countryImg)

//         $a.attr("href", "../html/community_searchCountry.html");


//         $a.click(function () {
//             localStorage.setItem("countryCode", item.countryCode);
//         });


//         $('#wrap-intnation').append($a);

//     })
// })