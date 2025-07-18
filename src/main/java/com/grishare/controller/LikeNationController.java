package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.dto.NationReturnDto;
import com.grishare.repository.UserRepository;
import com.grishare.service.LikeNationServiceImpl;
import com.grishare.service.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LikeNationController {
    private final LikeNationServiceImpl likeNationService;
    private final UserRepository userRepository;
    @PostMapping("/nation/{nationId}/like")
    public BaseResponse<HttpStatus> LikeNation(@PathVariable Long nationId, @AuthenticationPrincipal CustomUserDetail customUserDetail){
        try {
            User user = customUserDetail.getUser();
            likeNationService.updateOfLikeNation(nationId,user);
            BaseResponse.ok(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping("/nation/like")
    public BaseResponse<List<NationReturnDto>> GetLikeNation(@AuthenticationPrincipal CustomUserDetail customUserDetail){
        return BaseResponse.ok(likeNationService.findByUserId(customUserDetail.getUser().getId()));
    }
}
