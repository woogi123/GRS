/********** AJAX ***********/
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/scrap',
    success: function(data) {
        var length = data.data.length;

        /* 최신 2개만 조회 */
        var forNum = length;

        var i;
        for (i = 0; i < forNum; i++) {
            const showData = () => {
                length = length - 1;
                const writer = data.data[length].userName;
                const profileImg = data.data[length].userImg;
                const imgUrl = data.data[length].imgUrl;
                const contents = data.data[length].contents;
                const post_id = data.data[length].post_id;

                let link = document.createElement("a");

                link.href = "../html/community_comment.html";

                link.addEventListener("click", function(event) {
                    localStorage.setItem("post_id", post_id);
                });

                /* 시간 계산 */
                var createdAt = data.data[length].created_at;
                var createdTime = new Date(createdAt);

                var current = new Date(); //현재 시간

                var diff = current - createdTime; // 차이
                var diffM = Math.floor(diff / (1000 * 60)); //분으로 환산

                /* 구조 */
                let clipping_content = document.querySelector(".clipping_content");

                let clipping = document.createElement("div");
                clipping.setAttribute("class", "clipping");
                clipping_content.appendChild(clipping);

                let post_infor = document.createElement("div");
                post_infor.setAttribute("class", "post_infor");
                clipping.appendChild(post_infor);

                let post_content = document.createElement("div");
                post_content.setAttribute("class", "post_content");

                link.appendChild(post_content);
                clipping.appendChild(link);

                let post_func = document.createElement("div");
                post_func.setAttribute("class", "post_func");
                clipping.appendChild(post_func);

                /* 데이터 넣기 */

                /* infor */
                /* 유저 프로필 */
                /* 이미지 있어? 없으면 기본 넣어 */
                let profileImage = document.createElement("img");
                if (profileImg == "") {
                    profileImage.src = "../img/Default_Profile.png";
                } else {
                    profileImage.src = profileImg;
                }

                let p_writer = document.createElement("p");
                p_writer.setAttribute("class", "writer");
                p_writer.innerHTML = writer;

                /* 시간 표시 */

                let p_time = document.createElement("p");
                p_time.setAttribute("class", "time");

                if (diffM < 60) {
                    p_time.innerHTML = diffM + "분 전";
                } else if (diffM < 1440) {
                    diffM = Math.floor(diffM / 60);
                    p_time.innerHTML = diffM + "시간 전";
                } else if (diffM < 10080) {
                    diffM = Math.floor(diffM / 1440);
                    p_time.innerHTML = diffM + "일 전";
                } else if (diffM < 43800) {
                    diffM = Math.floor(diffM / 10080);
                    p_time.innerHTML = diffM + "주 전";
                } else if (diffM < 525600) {
                    diffM = Math.floor(diffM / 43800);
                    p_time.innerHTML = diffM + "달 전";
                } else {
                    diffM = Math.floor(diffM / 525600);
                    p_time.innerHTML = diffM + "년 전";
                }

                post_infor.appendChild(profileImage);
                post_infor.appendChild(p_writer);
                post_infor.appendChild(p_time);

                /* content */
                let p_contents = document.createElement("p");
                p_contents.innerHTML = contents;
                post_content.appendChild(p_contents);

                /* 이미지 */
                let img = document.createElement("img");
                if (!(imgUrl == "")) {
                    post_content.appendChild(img);
                }
                img.src = imgUrl;

                /* function */
                const like_count = data.data[length].like_count;
                const comment_count = data.data[length].comment_count;

                var likes_image = document.createElement("img");
                likes_image.setAttribute("id", "likes_image" + post_id);
                likes_image.setAttribute("class", "likes_image");
                likes_image.src = "../img/icon _heart_.png";

                var likes = document.createElement("div");
                likes.setAttribute("class", "likes");
                likes.innerText = like_count;

                var comment_image = document.createElement("img");
                comment_image.setAttribute("class", "comment_image");
                comment_image.src = "../img/icon _message_.png";

                var comment = document.createElement("div");
                comment.setAttribute("class", "comment")
                comment.innerText = comment_count;

                var scrap_image = document.createElement("img");
                scrap_image.setAttribute("id", "scrap_image" + post_id);
                scrap_image.setAttribute("class", "scrap_image");
                scrap_image.src = "../img/icon _yellow_star outline_.png";

                var scrap = document.createElement("div");
                scrap.setAttribute("class", "scrap");
                scrap.innerText = "스크랩";

                var share_image = document.createElement("img");
                share_image.setAttribute("id", "share_image" + post_id);
                share_image.setAttribute("class", "share_image");
                share_image.src = "../img/icon _share ios_.png"

                var share = document.createElement("div");
                share.setAttribute("id", "share" + post_id);
                share.setAttribute("class", "share");
                share.innerText = "공유";

                var report = document.createElement("div");
                report.setAttribute("id", "report" + post_id);
                report.setAttribute("class", "report");
                report.innerText = "신고";

                post_func.appendChild(likes_image);
                post_func.appendChild(likes);
                post_func.appendChild(comment_image);
                post_func.appendChild(comment);
                post_func.appendChild(scrap_image);
                post_func.appendChild(scrap);
                post_func.appendChild(share_image);
                post_func.appendChild(share);
                post_func.appendChild(report);

                /* 기능은 추후 추가 */

                $(document).on('click', '.report_click', function() {
                    //alert("신고되었습니다.");
                    localStorage.setItem('is_clicked_report', "1");
                    var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_searchCountry.html';

                    window.location.href = url;
                });


                // 좋아요
                let is_clicked_likes = false;

                $('.likes_image').click(function(event) {
                    var id_num = event.target.id.match(/\d+/)[0];
                    var postId = id_num;
                    // console.log(postId); // 이따 체크

                    event.stopPropagation();

                    if (!is_clicked_likes) {
                        $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_red.png");
                        is_clicked_likes = true;

                    } else {
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
                let is_clicked_scrap = true;

                $('.scrap_image').click(function(event) {
                    var id_num = event.target.id.match(/\d+/)[0];
                    var postId = id_num;
                    event.stopPropagation();

                    if (!is_clicked_scrap) {
                        $(`#scrap_image${id_num}`).attr("src", "../img/icon _yellow_star outline_.png");
                        is_clicked_scrap = true;
                    } else {
                        $(`#scrap_image${id_num}`).attr("src", "../img/icon _star outline_.png");
                        is_clicked_scrap = false;
                    }

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/scrap`,
                        success: function(data) {
                            // console.log("scrap connecting");
                        }
                    })
                });

            }
            showData();
        }
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});


/*** 스크랩 게시물 ***/
// var jsonLocation = "../json/clipping.json";
// $.getJSON(jsonLocation, function(data) {
//     var length = data.data.length;

//     /* 최신 2개만 조회 */
//     var forNum = length;

//     var i;
//     for (i = 0; i < forNum; i++) {
//         const showData = () => {
//             length = length - 1;
//             const writer = data.data[length].userName;
//             const profileImg = data.data[length].userImg;
//             const imgUrl = data.data[length].imgUrl;
//             const contents = data.data[length].contents;
//             const post_id = data.data[length].post_id;

//             let link = document.createElement("a");

//             link.href = "../html/community_comment.html";

//             link.addEventListener("click", function(event) {
//                 localStorage.setItem("post_id", post_id);
//             });

//             /* 시간 계산 */
//             var createdAt = data.data[length].created_at;
//             var createdTime = new Date(createdAt);

//             var current = new Date(); //현재 시간

//             var diff = current - createdTime; // 차이
//             var diffM = Math.floor(diff / (1000 * 60)); //분으로 환산

//             /* 구조 */
//             let clipping_content = document.querySelector(".clipping_content");

//             let clipping = document.createElement("div");
//             clipping.setAttribute("class", "clipping");
//             clipping_content.appendChild(clipping);

//             let post_infor = document.createElement("div");
//             post_infor.setAttribute("class", "post_infor");
//             clipping.appendChild(post_infor);

//             let post_content = document.createElement("div");
//             post_content.setAttribute("class", "post_content");

//             link.appendChild(post_content);
//             clipping.appendChild(link);

//             let post_func = document.createElement("div");
//             post_func.setAttribute("class", "post_func");
//             clipping.appendChild(post_func);

//             /* 데이터 넣기 */

//             /* infor */
//             /* 유저 프로필 */
//             /* 이미지 있어? 없으면 기본 넣어 */
//             let profileImage = document.createElement("img");
//             if (profileImg == "") {
//                 profileImage.src = "../img/Default_Profile.png";
//             } else {
//                 profileImage.src = profileImg;
//             }

//             let p_writer = document.createElement("p");
//             p_writer.setAttribute("class", "writer");
//             p_writer.innerHTML = writer;

//             /* 시간 표시 */

//             let p_time = document.createElement("p");
//             p_time.setAttribute("class", "time");

//             if (diffM < 60) {
//                 p_time.innerHTML = diffM + "분 전";
//             } else if (diffM < 1440) {
//                 diffM = Math.floor(diffM / 60);
//                 p_time.innerHTML = diffM + "시간 전";
//             } else if (diffM < 10080) {
//                 diffM = Math.floor(diffM / 1440);
//                 p_time.innerHTML = diffM + "일 전";
//             } else if (diffM < 43800) {
//                 diffM = Math.floor(diffM / 10080);
//                 p_time.innerHTML = diffM + "주 전";
//             } else if (diffM < 525600) {
//                 diffM = Math.floor(diffM / 43800);
//                 p_time.innerHTML = diffM + "달 전";
//             } else {
//                 diffM = Math.floor(diffM / 525600);
//                 p_time.innerHTML = diffM + "년 전";
//             }

//             post_infor.appendChild(profileImage);
//             post_infor.appendChild(p_writer);
//             post_infor.appendChild(p_time);

//             /* content */
//             let p_contents = document.createElement("p");
//             p_contents.innerHTML = contents;
//             post_content.appendChild(p_contents);

//             /* 이미지 */
//             let img = document.createElement("img");
//             if (!(imgUrl == "")) {
//                 post_content.appendChild(img);
//             }
//             img.src = imgUrl;

//             /* function */
//             const like_count = data.data[length].like_count;
//             const comment_count = data.data[length].comment_count;

//             var likes_image = document.createElement("img");
//             likes_image.setAttribute("id", "likes_image" + post_id);
//             likes_image.setAttribute("class", "likes_image");
//             likes_image.src = "../img/icon _heart_.png";

//             var likes = document.createElement("div");
//             likes.setAttribute("class", "likes");
//             likes.innerText = like_count;

//             var comment_image = document.createElement("img");
//             comment_image.setAttribute("class", "comment_image");
//             comment_image.src = "../img/icon _message_.png";

//             var comment = document.createElement("div");
//             comment.setAttribute("class", "comment")
//             comment.innerText = comment_count;

//             var scrap_image = document.createElement("img");
//             scrap_image.setAttribute("id", "scrap_image" + post_id);
//             scrap_image.setAttribute("class", "scrap_image");
//             scrap_image.src = "../img/icon _yellow_star outline_.png";

//             var scrap = document.createElement("div");
//             scrap.setAttribute("class", "scrap");
//             scrap.innerText = "스크랩";

//             var share_image = document.createElement("img");
//             share_image.setAttribute("id", "share_image" + post_id);
//             share_image.setAttribute("class", "share_image");
//             share_image.src = "../img/icon _share ios_.png"

//             var share = document.createElement("div");
//             share.setAttribute("id", "share" + post_id);
//             share.setAttribute("class", "share");
//             share.innerText = "공유";

//             var report = document.createElement("div");
//             report.setAttribute("id", "report" + post_id);
//             report.setAttribute("class", "report");
//             report.innerText = "신고";

//             post_func.appendChild(likes_image);
//             post_func.appendChild(likes);
//             post_func.appendChild(comment_image);
//             post_func.appendChild(comment);
//             post_func.appendChild(scrap_image);
//             post_func.appendChild(scrap);
//             post_func.appendChild(share_image);
//             post_func.appendChild(share);
//             post_func.appendChild(report);

//             /* 기능은 추후 추가 */

//             $(document).on('click', '.report_click', function() {
//                 //alert("신고되었습니다.");
//                 localStorage.setItem('is_clicked_report', "1");
//                 var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_searchCountry.html';

//                 window.location.href = url;
//             });


//             // 좋아요
//             let is_clicked_likes = false;

//             $('.likes_image').click(function(event) {
//                 var id_num = event.target.id.match(/\d+/)[0];
//                 var postId = id_num;
//                 // console.log(postId); // 이따 체크

//                 event.stopPropagation();

//                 if (!is_clicked_likes) {
//                     $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_red.png");
//                     is_clicked_likes = true;

//                 } else {
//                     $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_.png");
//                     is_clicked_likes = false;
//                 }

//                 $.ajax({
//                     type: 'POST',
//                     dataType: 'json',
//                     url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/like`,
//                     success: function(data) {
//                         // console.log("like connecting");

//                     }
//                 });
//             });


//             //스크랩
//             let is_clicked_scrap = true;

//             $('.scrap_image').click(function(event) {
//                 var id_num = event.target.id.match(/\d+/)[0];
//                 var postId = id_num;
//                 event.stopPropagation();

//                 if (!is_clicked_scrap) {
//                     $(`#scrap_image${id_num}`).attr("src", "../img/icon _yellow_star outline_.png");
//                     is_clicked_scrap = true;
//                 } else {
//                     $(`#scrap_image${id_num}`).attr("src", "../img/icon _star outline_.png");
//                     is_clicked_scrap = false;
//                 }

//                 $.ajax({
//                     type: 'POST',
//                     dataType: 'json',
//                     url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${postId}/scrap`,
//                     success: function(data) {
//                         // console.log("scrap connecting");
//                     }
//                 })
//             });

//         }
//         showData();
//     }
// });