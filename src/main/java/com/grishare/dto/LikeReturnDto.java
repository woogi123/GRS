package com.grishare.dto;

import com.grishare.domain.LikePost;
import com.grishare.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LikeReturnDto {
    private boolean like;
    private int like_count;

    public LikeReturnDto(Post post, boolean like) {
        this.like = like;
        this.like_count = post.getLikePosts().size();
    }
}
