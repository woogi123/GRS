package com.grishare.dto;

import com.grishare.domain.image.BackImage;
import com.grishare.domain.image.UserImage;
import com.grishare.domain.user.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class UserRequestDto {

    // 회원 수정 관련 requestDto -> 비밀번호, 닉네임, 사진을 수정할 수 있다!
    private String password;
    private String nickName;
    private String userLoginId;
    private String userName;


    public UserRequestDto(User user) {
        this.password = password;
        this.nickName = nickName;
        this.userName = userName;
        this.userLoginId = userLoginId;
    }
}

