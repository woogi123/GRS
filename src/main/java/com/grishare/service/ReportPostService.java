package com.grishare.service;

import com.grishare.domain.Post;
import com.grishare.domain.ReportPost;
import com.grishare.dto.PostReturnDto;
import com.grishare.dto.ReportPostRequestDto;

public interface ReportPostService {

//    public ReportPost save(Long postId, ReportPostRequestDto reportPostRequestDto);

    public ReportPost save(Long postId, Long userId, ReportPostRequestDto reportPostRequestDto);
}
