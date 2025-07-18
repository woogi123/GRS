package com.grishare.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.grishare.domain.Comment;
import lombok.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentReturnDto {
    private Long comment_id;
    private String contents;
    private String userName;
    private String writerImg;
    private String created_at;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CommentReturnDto> childCommentList;

    public CommentReturnDto(Comment comment) {
        this.comment_id = comment.getId();
        this.userName = comment.getUser().getNickName(); // 글쓰기 닉네임표시
        this.contents = comment.getContent();
        this.created_at = comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.writerImg = comment.getUser().getUserImg() == null ? "" : comment.getUser().getUserImg().getImageUrl();
    }
}
