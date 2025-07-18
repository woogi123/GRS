package com.grishare.dto;

import com.grishare.domain.LikePost;
import com.grishare.domain.Post;
import com.grishare.domain.image.PostImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDetailReturnDto {
    private Long post_id;
    private String title;
    private String contents;

    private String userName;
    private String created_at;
    private long views;

    private boolean like;
    private int like_count;
    private int comment_count;

    private List<CommentReturnDto> comment;
    private String imgUrl;

    public PostDetailReturnDto(Post post, LikeReturnDto likeReturnDto) {
        this.post_id = post.getId();
        this.title = post.getTitle();
        this.contents = post.getContent();
        this.userName = post.getUser().getNickName(); // 글쓰기 닉네임표시
        this.created_at = post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.views = post.getView();
        this.like = likeReturnDto.isLike();
        this.like_count = likeReturnDto.getLike_count();
        this.comment_count = post.getComments() == null ? 0 : post.getComments().size();
        this.comment = post.getComments().stream().map(CommentReturnDto::new).collect(Collectors.toList());
        this.imgUrl = post.getPostImage() == null ? null : post.getPostImage().getImageUrl();
    }
}
