package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.dto.NationInfoResponseDto;
import com.grishare.dto.PostDetailReturnDto;
import com.grishare.dto.PostRequestDto;
import com.grishare.dto.PostReturnDto;
import com.grishare.service.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostServiceImpl postService;

    @GetMapping("/posts")
    public BaseResponse<List<PostReturnDto>> getAllPost() {
        List<PostReturnDto> posts = postService.findAll();

        return BaseResponse.ok(posts);
    }

    @GetMapping("/posts/nation/{nationId}")
    public BaseResponse<List<PostReturnDto>> getPostByNationId(@PathVariable("nationId") long nationId) {
        return BaseResponse.ok(postService.findByNationId(nationId));
    }

    @GetMapping("/posts/{postId}")
    public BaseResponse<PostDetailReturnDto> getPostByPostId(@AuthenticationPrincipal CustomUserDetail customUserDetail, @PathVariable("postId") long postId) {
        try {
            return BaseResponse.ok(postService.findByPostId(customUserDetail, postId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/posts/{nationId}")
    public BaseResponse<PostReturnDto> createPost(
            @AuthenticationPrincipal CustomUserDetail customUserDetail,
            @PathVariable("nationId") long nationId,
            @RequestPart PostRequestDto postRequestDto,
            @RequestPart(required = false) MultipartFile imageFile) {

        return BaseResponse.ok(postService.save(customUserDetail.getUser(), nationId, postRequestDto, imageFile));
    }

    @PutMapping("/posts/{postId}")
    public BaseResponse<PostReturnDto> updatePost(
            @PathVariable("postId") long postId,
            @RequestBody PostRequestDto postRequestDto
    ) {
        try {
            BaseResponse.ok(postService.update(postId, postRequestDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @DeleteMapping("/posts/{postId}")
    public BaseResponse<HttpStatus> deletePost(@PathVariable("postId") long postId) {
        try {
            postService.delete(postId);
            BaseResponse.ok(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/post/hotview")
    public BaseResponse<?> getHotPosts() {
        return BaseResponse.ok(postService.getHotPosts());
    }

    @GetMapping("/posts/{nationId}/info")
    public BaseResponse<?> getNationInfo(@PathVariable("nationId") Long nation_id) {
        NationInfoResponseDto nationInfoResponseDto = postService.getNationInfo(nation_id);
        return BaseResponse.ok(nationInfoResponseDto);
    }
}
