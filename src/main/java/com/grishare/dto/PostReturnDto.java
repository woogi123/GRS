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
public class PostReturnDto {
    private Long post_id;
    private String title;
    private String contents;
    private String userName;
    private String created_at;
    private long views;
    private int like_count;
    private int comment_count;
    // 유저 프로필 이미지 일단 string 으로 넣을게요!
    private String userImg;
    private String imgUrl;

    public PostReturnDto(Post post) {
        this.post_id = post.getId();
        this.title = post.getTitle();
        this.contents = post.getContent();
        this.userName = post.getUser().getNickName(); // 글쓰기 닉네임표시
        this.created_at = post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.views = post.getView();
        this.userImg = post.getUser().getUserImg() == null ? "" : post.getUser().getUserImg().getImageUrl();
        this.like_count = post.getLikePosts() == null ? 0 : post.getLikePosts().size();
        this.comment_count = post.getComments() == null ? 0 : post.getComments().size();
        this.imgUrl = post.getPostImageUrl();
    }

    @Getter
    public static class naitonInfo extends PostReturnDto {
        public String countryName;
        public String imageUrl;

        public naitonInfo(Post post) {
            super(post);
            this.countryName = post.getNation().getCountryName();
            this.imageUrl = post.getNation().getNationImgUrl();
        }

    }


}