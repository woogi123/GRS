var postId = localStorage.getItem('postid');
console.log(postId);

$(document).ready(function() {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: `/api/posts/${postId}/scrap`,
    data : { json: JSON.stringify( jsonData ) },
    success: function(data) {
        console.log("scrap connecting");
    
    
    }});
});
    
