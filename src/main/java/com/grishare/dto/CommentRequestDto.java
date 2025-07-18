package com.grishare.dto;

import com.grishare.domain.Comment;
import com.grishare.domain.user.User;
import lombok.Data;

@Data
public class CommentRequestDto {
    private Long postId;
    private String content;
    private User writer;

    public Comment toEntiy(){
        return Comment.builder()
                .content(content)
                .user(writer)
                .build();
    }
}
