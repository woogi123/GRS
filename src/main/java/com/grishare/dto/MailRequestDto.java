package com.grishare.dto;

import lombok.Data;

@Data
public class MailRequestDto {
    private String email;

    public String getEmail(){
        return email;
    }
}
