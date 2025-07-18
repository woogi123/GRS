package com.grishare.service;

import com.grishare.domain.Comment;
import com.grishare.dto.CommentRequestDto;
import com.grishare.dto.CommentReturnDto;

import java.util.List;

public interface CommentService {
    public Comment createComment(CommentRequestDto commentRequestDto);
    public List<CommentReturnDto> getComments(Long postId, Long userId);
}
