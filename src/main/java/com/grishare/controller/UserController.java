package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.dto.*;
import com.grishare.service.MailServiceImpl;
import com.grishare.service.PostServiceImpl;
import com.grishare.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserServiceImpl userService;
    private final MailServiceImpl mailService;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    // 회원가입
    @PostMapping(value = "/user/register")
    public ResponseEntity<UserReturnDto> register(@RequestBody RegisterRequestDto registerRequestDto) {
        registerRequestDto.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));

        return new ResponseEntity<>(userService.saveUser(registerRequestDto), HttpStatus.OK);
    }

    // 로그인
    @PostMapping("/user/login")
    public ResponseEntity<?> login(HttpServletRequest request, HttpServletResponse response,
                                   @RequestBody LoginRequestDto loginRequestDto) {
        UserDetails userDetails = userService.loadUserByUsername(loginRequestDto.getUserLoginId());
        // 인증 객체 생성
        Authentication authentication
                = new UsernamePasswordAuthenticationToken(userDetails, loginRequestDto.getPassword(), new ArrayList<>());
        try {
            authenticationManager.authenticate(authentication);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid Id or password");
        }
        // SecurityContextHolder : Authentication을 감싸는 객체
        SecurityContextHolder.getContext().setAuthentication(authentication);
        HttpSession session = request.getSession();
        session.setAttribute
                (HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                        SecurityContextHolder.getContext());
        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        cookie.setMaxAge(30000 * 60);
        response.addCookie(cookie);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //회원정보 조회
    @GetMapping("/myPage")
    public BaseResponse<UserReturnDto> getUser(@AuthenticationPrincipal CustomUserDetail customUserDetail) {
        UserReturnDto userReturnDto = userService.getUser(customUserDetail.getUser());

        return BaseResponse.ok(userReturnDto);
    }

    // 회원정보 수정
    @PutMapping("/myPage")
    public BaseResponse<UserReturnDto> updateUser(@AuthenticationPrincipal CustomUserDetail customUserDetail, @RequestBody UserRequestDto userRequestDto) {
        User user = userService.updateUser(customUserDetail.getUser(), userRequestDto);
        UserReturnDto userReturn = userService.getUser(user);

        return BaseResponse.ok(userReturn);
    }


    // 비밀번호 찾기 -> 이메일 보내기
    @ResponseBody
    @PostMapping("/user/findPw")
    public BaseResponse<MailDto> sendPwdEmail(@RequestBody MailRequestDto mailRequestDto) {

        String memberEmail = mailRequestDto.getEmail();
        System.out.println("memberEmail = " + memberEmail);
        // 임시 비밀번호 생성
        String tmpPassword = userService.getTmpPassword();
        // 임시 비밀번호 저장
        userService.updatePassword(tmpPassword, memberEmail);
        // 메일 생성, 전송
        MailDto mail = mailService.createMail(tmpPassword, memberEmail);
        mailService.sendMail(mail);

        return BaseResponse.ok(mail);


    }

    // 내가 쓴 글 목록 전체 보기
    @GetMapping("/myPost")
    public BaseResponse<List<PostReturnDto.naitonInfo>> getMyPosts(@AuthenticationPrincipal CustomUserDetail customUserDetail) {
        List<PostReturnDto.naitonInfo> myPostList = userService.getMyPost(customUserDetail.getUser().getId());
        return BaseResponse.ok(myPostList);
    }

    // 스크랩한 글 조회
    @GetMapping("/posts/scrap")
    public BaseResponse<List<PostReturnDto>> getScrapPosts(@AuthenticationPrincipal CustomUserDetail customuserDetail) {
        List<PostReturnDto> scrapPostList = userService.getMyScrap(customuserDetail.getUser().getId());

        return BaseResponse.ok(scrapPostList);
    }
}