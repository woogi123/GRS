package com.grishare.dto;

import com.grishare.domain.Post;
import com.grishare.domain.ReportPost;
import com.grishare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportPostRequestDto {

    private Post post;
    private User writer;
    private String reason;

    public ReportPost toEntity(Post post, User writer) {
        ReportPost reportPost = new ReportPost(
                this.post = post,
                this.writer = writer,
                this.reason
        );
        return reportPost;
    }
//    public ReportPost toEntity(Post post) {
//        ReportPost reportPost = new ReportPost(
//                this.post = post,
//                this.reason
//        );
//        return reportPost;
//    }
}
