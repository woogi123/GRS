package com.grishare.service;

import com.grishare.domain.user.User;
import com.grishare.dto.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {

    public UserReturnDto saveUser(RegisterRequestDto registerRequestDto);
    public UserReturnDto getUser(User user); // 회원정보 가져오기

    public String getTmpPassword();
    public void updatePassword(String tmpPassword, String memberEmail);

    public List<PostReturnDto> getMyScrap(Long userId);

    // 회원정보 수정 -> 이미지 어떻게 할 것인가.
    @Transactional
    User updateUser(User user, UserRequestDto userRequestDto);

    public List<PostReturnDto.naitonInfo> getMyPost(Long userId);

}
