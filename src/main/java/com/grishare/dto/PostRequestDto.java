package com.grishare.dto;

import com.grishare.domain.Comment;
import com.grishare.domain.Nation;
import com.grishare.domain.Post;
import com.grishare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostRequestDto {
    private String title;
    private String content;

    public Post toEntity(User user, Nation nation) {
        Post post = Post.builder()
                .title(title)
                .content(content)
                .user(user)
                .nation(nation)
                .view(0L)
                .build();

        return post;
    }


}