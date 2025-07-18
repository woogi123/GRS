package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.domain.Comment;
import com.grishare.domain.Post;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.dto.CommentRequestDto;
import com.grishare.dto.CommentReturnDto;
import com.grishare.dto.PostRequestDto;
import com.grishare.service.CommentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class CommentController {

    private final CommentServiceImpl commentService;
    @PostMapping("posts/{postId}/comment")
    public BaseResponse<CommentReturnDto> createComment(@PathVariable("postId") Long postId,
                                                        @RequestBody CommentRequestDto commentDto,
                                                        @AuthenticationPrincipal CustomUserDetail customUserDetail) {
        commentDto.setWriter(customUserDetail.getUser());
        commentDto.setPostId(postId);
        try {
            BaseResponse.ok(commentService.createComment(commentDto));
        }catch (Exception e){
            e.printStackTrace();

        }
        return null;
    }
}
