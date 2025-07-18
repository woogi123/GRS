package com.grishare.domain;

import com.grishare.domain.image.PostImage;
import com.grishare.domain.user.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)


public class Post {
    @Id //pk
    @GeneratedValue(strategy = GenerationType.AUTO) // table id 생성 규칙
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "contents")
    private String content;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;
    @Column(name = "views")
    private Long view;
    @OneToOne(mappedBy = "post")
    private PostImage postImage;
    @ManyToOne
    @JoinColumn(name = "nationId")
    private Nation nation;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @OneToMany(mappedBy = "post", orphanRemoval = true)
    private List<Comment> comments;
    @OneToMany(mappedBy = "post", orphanRemoval = true)
    private List<Scrap> scraps;
    @OneToMany(mappedBy = "post", orphanRemoval = true)
    private List<LikePost> likePosts;
    @OneToMany(mappedBy = "post", orphanRemoval = true)
    private List<ReportPost> reportPosts;

    public String getPostImageUrl() {
        return postImage == null ? "" : postImage.getImageUrl();
    }
}
