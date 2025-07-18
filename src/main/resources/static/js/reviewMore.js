/********** AJAX ***********/
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/myPost',
    success: function(data) {

        var length = data.data.length;

        /* 최신 2개만 조회 */
        var forNum = length;

        var i;
        for (i = 0; i < forNum; i++) {
            const showData = () => {
                length = length - 1;
                const countryName = data.data[length].countryName;
                const imgUrl = data.data[length].imageUrl;
                const contents = data.data[length].contents;
                const postID = data.data[length].post_id;
                var createdAt = data.data[length].created_at;

                let review_contents = document.querySelector(".review_contents");

                let link = document.createElement("a");

                /* 구조 */
                let review = document.createElement("div");
                review.setAttribute("class", "review");
                link.appendChild(review);
                review_contents.appendChild(link);

                link.href = "../html/community_comment.html";

                link.addEventListener("click", function(event) {
                    localStorage.setItem("postID", postID);
                });

                let review_infor = document.createElement("div");
                review_infor.setAttribute("class", "review_infor");
                review.appendChild(review_infor);

                let review_content = document.createElement("div");
                review_content.setAttribute("class", "review_content");
                review.appendChild(review_content);

                var datePart = createdAt.split(' ')[0];
                var formDate = datePart.replace(/-/g, '.');
                let date = document.createElement("p");
                date.setAttribute("class", "review_date");
                date.innerHTML = formDate;
                review.appendChild(date);

                /* 데이터 넣기 */
                /* infor */
                let imageUrl = document.createElement("img");
                imageUrl.src = imgUrl;

                let counName = document.createElement("p");
                counName.innerHTML = countryName;

                review_infor.appendChild(imageUrl);
                review_infor.appendChild(counName);

                /* content */
                let p_contents = document.createElement("p");
                p_contents.innerHTML = contents;

                review_content.appendChild(p_contents);
            }
            showData();
        }
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});

////////////////////////////////////////////


/*** 내가 쓴 리뷰 ***/
// var jsonLocation = "../json/myReview.json";
// $.getJSON(jsonLocation, function(data) {

//     var length = data.data.length;
//     var num = length;
//     var i;
//     for (i = 0; i < num; i++) {
//         const showData = () => {
//             length = length - 1;
//             const countryName = data.data[length].countryInfo.countryName;
//             const imgUrl = data.data[length].countryInfo.ImageUrl;
//             const contents = data.data[length].contents;
//             const postID = data.data[length].post_id;
//             var createdAt = data.data[length].created_at;

//             let review_contents = document.querySelector(".review_contents");

//             let link = document.createElement("a");

//             /* 구조 */
//             let review = document.createElement("div");
//             review.setAttribute("class", "review");
//             link.appendChild(review);
//             review_contents.appendChild(link);

//             link.href = "../html/community_comment.html";

//             link.addEventListener("click", function(event) {
//                 localStorage.setItem("postID", postID);
//             });

//             let review_infor = document.createElement("div");
//             review_infor.setAttribute("class", "review_infor");
//             review.appendChild(review_infor);

//             let review_content = document.createElement("div");
//             review_content.setAttribute("class", "review_content");
//             review.appendChild(review_content);

//             var datePart = createdAt.split(' ')[0];
//             var formDate = datePart.replace(/-/g, '.');
//             let date = document.createElement("p");
//             date.setAttribute("class", "review_date");
//             date.innerHTML = formDate;
//             review.appendChild(date);

//             /* 데이터 넣기 */
//             /* infor */
//             let imageUrl = document.createElement("img");
//             imageUrl.src = imgUrl;

//             let counName = document.createElement("p");
//             counName.innerHTML = countryName;

//             review_infor.appendChild(imageUrl);
//             review_infor.appendChild(counName);

//             /* content */
//             let p_contents = document.createElement("p");
//             p_contents.innerHTML = contents;

//             review_content.appendChild(p_contents);
//         }
//         showData();
//     }
// });