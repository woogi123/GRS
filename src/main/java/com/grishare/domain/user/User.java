package com.grishare.domain.user;

import com.grishare.domain.Comment;
import com.grishare.domain.LikePost;
import com.grishare.domain.Post;
import com.grishare.domain.ReportPost;
import com.grishare.domain.Scrap;
import com.grishare.domain.image.BackImage;
import com.grishare.domain.image.UserImage;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name="users")
@Getter @Builder
@ToString @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //사용자 PK -> id
    @Column(name="user_id")
    private String userLoginId; // 사용자가 입력하는 ID
    @Column(unique = true)
    private String email;
    private String password;
    @Column(unique = true)
    private String nickName; // 닉네임
    private String userName;    // 사용자 이름
    @CreatedDate
    private LocalDateTime createdAt; // 가입날짜
    private Integer birthDay; // 회원 생년월일 erd에 없음
    @OneToOne(mappedBy = "user")
    private UserImage userImg; // 프로필 이미지 -> 배포여부에 따라 -> 일단 배포는 미정 안할
    @OneToOne(mappedBy = "user")
    private BackImage backgroundImg;
    // 이미지 경로를 저장하는 변수
    private String address;
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<Post> posts;
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<Scrap> scraps; // 스크랩(찜)한 게시물
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<LikePost> likePosts; // 스크랩(찜)한 게시물
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<Comment> comments;
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<ReportPost> reportPosts;

    //@Embedded
    //private NotificationSetting notificationSetting; // 알림 설정

    public User encodePassword(PasswordEncoder passwordEncoder){
        password = passwordEncoder.encode(password);
        return this;
    }


    public  void updatePassword(String password){
        this.password = password;
    }

//    public User(String userId, String email, String password, String nickName, String userName, Integer birthDay) {
//        this.userId = userId;
//        this.email = email;
//        this.password = password;
//        this.nickName = nickName;
//        this.userName = userName;
//        this.birthDay = birthDay;
//    }


}
