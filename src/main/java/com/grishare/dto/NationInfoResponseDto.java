package com.grishare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NationInfoResponseDto {

    public String nationName; //대한민국 Republic Of Korea

    public int likes;

    public String imageUrl;

}
