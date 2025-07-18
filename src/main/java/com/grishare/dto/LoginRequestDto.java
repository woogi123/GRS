package com.grishare.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String userLoginId;
    private String password;
}
