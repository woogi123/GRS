package com.grishare.controller;

import com.amazonaws.Response;
import com.grishare.base.BaseResponse;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.repository.UserRepository;
import com.grishare.service.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LikeController {
    private final LikeServiceImpl likeService;


    @PostMapping("/posts/{postId}/like")
    public BaseResponse<HttpStatus> Like(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetail customUserDetail){
        try {
            User user = customUserDetail.getUser();
            likeService.updateOfLikePost(postId,user);
            BaseResponse.ok(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
