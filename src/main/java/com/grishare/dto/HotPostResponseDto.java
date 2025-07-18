package com.grishare.dto;

import lombok.Data;
import org.springframework.boot.sql.init.dependency.DependsOnDatabaseInitialization;

@Data
public class HotPostResponseDto {

    public Long post_id;

    public String title;

    public String contents;

    public Integer likes;

    public HotPostResponseDto(Long post_id, String title, String contents, Integer likes) {
        this.post_id = post_id;
        this.title = title;
        this.contents = contents;
        this.likes = likes;
    }
}
