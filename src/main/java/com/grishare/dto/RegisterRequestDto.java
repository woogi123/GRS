package com.grishare.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
public class RegisterRequestDto {
    private String userLoginId;
    private String password;
    private String email;
    private String userName;
    private String nickName;
    private Integer birthDay;

    public RegisterRequestDto(String userLoginId, String password, String email, String userName, String nickName, Integer birthDay) {
        this.userLoginId = userLoginId;
        this.password = password;
        this.email = email;
        this.userName = userName;
        this.nickName = nickName;
        this.birthDay = birthDay;
    }


}
