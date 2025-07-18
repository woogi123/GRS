var postId = localStorage.getItem('postid');
var nationId = localStorage.getItem('nationId');
console.log(postId);

$(document).ready(function() {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: `/api/posts/${nationId}/${postId}/comment`,
    data : { json: JSON.stringify( jsonData ) },
    success: function(data) {
        console.log("scrap connecting");
    
    
    }});
});
    
