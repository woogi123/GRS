package com.grishare.domain;

import com.grishare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content; // 댓글 내용
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;  // 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post; // 댓글이 달린 게시판

    @CreationTimestamp
    private LocalDateTime createdAt;


}
